const Joi = require("joi");

const validateRequest = (schema, data) => {
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
        const validationMessages = {};
        error.details.forEach((err) => {
            const fieldName = err.path[0];
            const errorMessage = err.message;

            if (!validationMessages[fieldName]) {
                validationMessages[fieldName] = [];
            }
            validationMessages[fieldName].push(errorMessage);
        });
        return validationMessages;
    }
    return null;
};

module.exports = { validateRequest };
