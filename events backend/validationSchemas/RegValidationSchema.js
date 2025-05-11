import Joi from "joi";

const RegValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  age: Joi.number().integer().min(1).max(120).required(),
});

export default RegValidationSchema;
