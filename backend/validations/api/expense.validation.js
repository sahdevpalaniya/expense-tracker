const Joi = require("joi");
const { validateRequest } = require('../validateRequest');

const createExpense = (req, res, next) => {

    const schema = Joi.object({
        user_id: Joi.string().required(),
        type: Joi.string().valid("0", "1", "3").required(),
        amount: Joi.string().required(),
        category: Joi.string().required(),
        expense_date: Joi.date().required(),
        description: Joi.string(),
    });

    const validationMessages = validateRequest(schema, req.body);

    if (validationMessages) {
        return res.status(400).json({
            status: 'error',
            errors: validationMessages
        });
    }

    next();
};

const updateExpense = (req, res, next) => {

    const schema = Joi.object({
        id: Joi.object(),
        user_id: Joi.string().required(),
        type: Joi.string().valid("0", "1", "3").required(),
        amount: Joi.string().required(),
        category: Joi.string().required(),
        expense_date: Joi.date().required(),
        description: Joi.string(),
    });

    const validationMessages = validateRequest(schema, req.body);

    if (validationMessages) {
        return res.status(400).json({
            status: 'error',
            errors: validationMessages
        });
    }

    next();
};

module.exports = {
    createExpense,
    updateExpense
};