const Joi = require("joi");
const userSchema = Joi.object({
  fullName: Joi.string().min(6).max(20).required().messages({
    "string.base": "მხოლოდ სტრინგი",
    "string.min": "მინიმუმია 6",
    "string.max": " მაქსიმუმია 20",
    "any.required": "სრული სახხელი აუცილებელია",
  }),
  email: Joi.string().email().required(),
  age: Joi.number().min(12).max(80).required().messages({
    "number.base": "მხოლოდ რიცხვი",
    "number.min": "minimumi 12",
    "any.required": "aucilebelia yvelaaaaaaaaaa",
  }),
  password: Joi.string().regex(new RegExp("^[A-Za-z0-9]+$")).required(),
  isSmoker: Joi.boolean().optional().default(false),
});

module.exports = userSchema;
