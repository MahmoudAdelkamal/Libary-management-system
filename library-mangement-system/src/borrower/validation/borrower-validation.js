import Joi from "joi";
import { EMAIL_REGEX } from "../../shared/utils/constants.js";

export const signUpBorrowerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(8).max(50).pattern(EMAIL_REGEX).required(),
  password: Joi.string().min(8).max(50).required(),
});

export const loginBorrowerSchema = Joi.object({
  email: Joi.string().min(8).max(50).required(),
  password: Joi.string().min(8).max(50).required(),
});

export const updateBorrowerParamsSchema = Joi.object({
  id: Joi.number().min(1).required(),
});

export const updateBorrowerBodySchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(8).max(50).pattern(EMAIL_REGEX).required(),
});

export const deleteBorrowerSchema = Joi.object({
  id: Joi.number().min(1).required(),
});

export const findAllBorrowersSchema = Joi.object({
  limit: Joi.number().integer().min(5).max(10).default(5),
  offset: Joi.number().integer().min(0).default(0),
  sortAttribute: Joi.string()
    .valid("registeredAt", "email", "name")
    .default("registeredAt"),
  sortOrder: Joi.string().valid("ASC", "DESC").default("ASC"),
});
