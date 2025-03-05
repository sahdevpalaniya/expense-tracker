const { mongoose, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
const { types, required } = require("joi");

const expenseSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        type: {
            type: String,
            enum: [0, 1, 2],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: null
        },
        expense_date: {
            type: Date,
            default: Date.now,
        }
    },
    {
        timestamps: true,
    }
);

// expenseSchema.statics.getAllExpense = async function (userId, skip, limit, filters = {}) {
//     try {
//         const query = { user_id: userId, ...filters };
//         const totalRecords = await this.countDocuments(query);
//         const expenses = await this.find(query)
//             .skip(skip)
//             .limit(limit)
//             .select('-__v');

//         const [income, expense] = await Promise.all([
//             this.aggregate([
//                 { $match: { user_id: userId, type: "0", ...filters } },
//                 { $group: { _id: null, income: { $sum: '$amount' } } }
//             ]),
//             this.aggregate([
//                 { $match: { user_id: userId, type: "1", ...filters } },
//                 { $group: { _id: null, expense: { $sum: '$amount' } } }
//             ])
//         ]);

//         const totalIncome = income[0]?.income || 0;
//         const totalExpense = expense[0]?.expense || 0;

//         return {
//             expenses,
//             totalRecords,
//             totalIncome,
//             totalExpense,
//             totalAmount: totalIncome - totalExpense,
//         };
//     } catch (err) {
//         console.error('Error:', err.stack);
//         throw err;
//     }
// };

expenseSchema.statics.getAllExpense = async function (userId, filters = {}) {
    try {
        const query = { user_id: userId };
        const totalRecords = await this.countDocuments(query);
        const expenses = await this.find({ user_id: userId, ...filters }).select('-__v').sort({ 'expense_date': -1 });

        const [income, expense] = await Promise.all([
            this.aggregate([
                { $match: { type: "0", ...filters } },
                { $group: { _id: null, income: { $sum: '$amount' } } }
            ]),
            this.aggregate([
                { $match: { user_id: userId, type: "1", ...filters } },
                { $group: { _id: null, expense: { $sum: '$amount' } } }
            ])
        ]);

        const totalIncome = income[0]?.income || 0;
        const totalExpense = expense[0]?.expense || 0;

        return {
            expenses,
            totalRecords,
            totalIncome,
            totalExpense,
            totalAmount: totalIncome - totalExpense,
        };
    } catch (err) {
        console.error('Error:', err.stack);
        throw err;
    }
};

expenseSchema.statics.getExpenseById = async function (expenseId) {
    try {
        return await this.findById(expenseId);
    } catch (err) {
        console.log(err.message);
    }
};

expenseSchema.statics.getExpense = async function (column, value) {
    try {
        const query = {};
        query[column] = value;
        return await this.findOne(query);
    } catch (err) {
        console.log(err.message);
    }
};


expenseSchema.statics.createExpense = async function (expenseData) {
    try {
        const newExpense = await this.create(expenseData);
        return newExpense;
    } catch (err) {
        console.log(err.message);
    }
};

expenseSchema.statics.updateExpense = async function (expenseId, updateData) {
    try {
        return await this.findByIdAndUpdate(expenseId, updateData, { new: true });
    } catch (err) {
        throw new Error("Error updating expense: " + err.message);
    }
};

expenseSchema.statics.deleteExpense = async function (expenseId) {
    try {
        return await this.deleteOne({ _id: expenseId });
    } catch (err) {
        console.log(err.message);
    }
};

const ExpensesModel = mongoose.model('Expense', expenseSchema);
module.exports = ExpensesModel;