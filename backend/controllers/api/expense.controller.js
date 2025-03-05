// userController.js
const { StatusCodes } = require('http-status-codes');
const Expense = require('../../models/expense.model');
const { resp } = require('../../helpers/response.helpers');

// const getAllExpense = (req, res) => {
//     try {
//         const { page = 1, limit = 10 } = req.query;
//         const skip = (page - 1) * limit;

//         Expense.getAllExpense(req.user._id, skip, limit)
//             .then((expenses) => {
//                 return resp(res, StatusCodes.OK, 'Expenses retrieved successfully.', true, expenses);
//             })
//             .catch((err) => {
//                 console.error(err);
//                 return resp(res, StatusCodes.BAD_GATEWAY, 'Error getting expenses: ' + err.message, false);
//             });

//     } catch (err) {
//         console.error("Expense Creation Error: " + err.message);
//         return resp(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Internal server error.', false);
//     }
// };

const getAllExpense = (req, res) => {
    try {
        const { type } = req.query;
        let filters = {};

        if (type) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);  // Set to start of day

            switch (type.toLowerCase()) {
                case 'daily':
                    const tomorrow = new Date(today);
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    filters.expense_date = { $gte: today, $lt: tomorrow };
                    break;
                case 'monthly':
                    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                    const startOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
                    filters.expense_date = { $gte: startOfMonth, $lt: startOfNextMonth };
                    break;
                case 'yearly':
                    const startOfYear = new Date(today.getFullYear(), 0, 1);
                    const startOfNextYear = new Date(today.getFullYear() + 1, 0, 1);
                    filters.expense_date = { $gte: startOfYear, $lt: startOfNextYear };
                    break;
                default:
                    break;
            }
        }

        Expense.getAllExpense(req.user._id, filters)
            .then((result) => {
                return resp(res, StatusCodes.OK, 'Expenses retrieved successfully.', true, result);
            })
            .catch((err) => {
                console.error('Error:', err);
                return resp(res, StatusCodes.BAD_GATEWAY, 'Error getting expenses: ' + err.message, false);
            });

    } catch (err) {
        console.error("Expense Retrieval Error: " + err.message);
        return resp(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Internal server error.', false);
    }
};

const createExpense = (req, res) => {
    try {
        Expense.createExpense(req.body).then((expense) => {
            return resp(res, StatusCodes.OK, 'Expense added successfully.', true, expense);
        }).catch((err) => {
            return resp(res, StatusCodes.BAD_GATEWAY, 'Error adding expense record.' + err.message, false);
        });
    } catch (err) {
        throw new Error("Expense Creation Error :" + err.message);
    }
};

const updateExpense = (req, res) => {
    try {
        Expense.updateExpense(req.params.id, req.body)
            .then((expense) => {

                return resp(res, StatusCodes.OK, 'Expense updated successfully.', true, expense);
            })
            .catch((err) => {
                return resp(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Error updating expense record.' + err.message, false);
            });
    } catch (err) {
        return resp(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Expense Updation Error: ' + err.message, false);
    }
};

const deleteExpense = (req, res) => {
    Expense.deleteExpense(req.params.id)
        .then(() => {
            return resp(res, StatusCodes.OK, 'Expense deleted successfully.', true);
        })
        .catch((err) => {
            return resp(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Error updating user record.' + err.message, false);
        });
};

module.exports = {
    getAllExpense,
    createExpense,
    updateExpense,
    deleteExpense
};