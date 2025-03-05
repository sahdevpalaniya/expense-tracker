const Joi = require("joi");
const { validateRequest } = require('../validateRequest');

const createUser = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        username: Joi.string().min(2).required(),
        password: Joi.string().min(6).required(),
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

const getUser = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.required(),
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

const updateUser = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.required(),
        name: Joi.string().min(2).required(),
        email: Joi.string().min(2).required(),
        username: Joi.string().min(2).required(),
        password: Joi.string().min(6).required(),
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
    createUser,
    updateUser,
    getUser
};