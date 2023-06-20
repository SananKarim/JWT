const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).max(15).required(),
});

exports.validateSignup = validator(signupSchema);
