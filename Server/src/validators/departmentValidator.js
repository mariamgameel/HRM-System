const Joi = require("joi");

const createDepartmentSchema = Joi.object({
    name: Joi.string().min(2).required(),
    description: Joi.string().allow(""),
});


const updateDepartmentSchema = Joi.object({
    name: Joi.string().min(2),
    description: Joi.string().allow(""),
    status: Joi.string().valid("active", "inactive"),
}).min(1);

module.exports = {
    createDepartmentSchema,
    updateDepartmentSchema,
};