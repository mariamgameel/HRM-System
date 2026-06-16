const Joi = require("joi");

const manualAttendanceSchema = Joi.object({
    employee: Joi.string().hex().length(24).required(),
    date: Joi.date().required(),
    status: Joi.string().valid("absent", "on-leave").required(),
    note: Joi.string().allow("")
});


const updateAttendanceSchema = Joi.object({
    status: Joi.string().valid("present", "absent", "late", "on-leave"),
    note: Joi.string().allow(""),
    clockIn: Joi.date(),
    clockOut: Joi.date()
}).min(1);

module.exports = {
    manualAttendanceSchema,
    updateAttendanceSchema
};