import Joi from "joi";
import { ISBN_REGEX } from "../../shared/utils/constants.js";

// add new book validation schema
export const createBookSchema = Joi.object({
  title: Joi.string().min(1).max(255).required().messages({
    "string.base": `"title" must be a string`,
    "string.empty": `"title" can't be empty`,
    "string.min": `"title" should have at least {#limit} characters`,
    "string.max": `"title" shouldn't exceed {#limit} characters`,
    "any.required": `"title" is required`,
  }),
  author: Joi.string().min(1).max(255).required().messages({
    "string.base": `"author" must be a string`,
    "string.empty": `"author" can't be empty`,
    "string.min": `"author" should have at least {#limit} characters`,
    "string.max": `"author" shouldn't exceed {#limit} characters`,
    "any.required": `"author" is required`,
  }),
  isbn: Joi.string().pattern(ISBN_REGEX).required().messages({
    "string.base": `"isbn" must be a string`,
    "string.empty": `"isbn" can't be empty`,
    "string.pattern.base": `"isbn" is not valid`,
    "any.required": `"isbn" is required`,
  }),
  availableQty: Joi.number().integer().min(1).required().messages({
    "number.base": `"availableQty" must be a number`,
    "number.integer": `"availableQty" must be an integer`,
    "number.min": `"availableQty" must be at least {#limit}`,
    "any.required": `"availableQty" is required`,
  }),
  shelfLocation: Joi.string().min(1).max(255).required().messages({
    "string.base": `"shelfLocation" must be a string`,
    "string.empty": `"shelfLocation" can't be empty`,
    "string.min": `"shelfLocation" should have at least {#limit} characters`,
    "string.max": `"shelfLocation" shouldn't exceed {#limit} characters`,
    "any.required": `"shelfLocation" is required`,
  }),
});

// update book validation schemas

export const updateBookParamsSchema = Joi.object({
  id: Joi.number().min(1).required(),
});

export const updateBookBodySchema = Joi.object({
  title: Joi.string().min(1).max(255).messages({
    "string.base": `"title" must be a string`,
    "string.min": `"title" should have at least {#limit} characters`,
    "string.max": `"title" should not exceed {#limit} characters`,
  }),
  author: Joi.string().min(1).max(255).messages({
    "string.base": `"author" must be a string`,
    "string.min": `"author" should have at least {#limit} characters`,
    "string.max": `"author" should not exceed {#limit} characters`,
  }),
  isbn: Joi.string().pattern(ISBN_REGEX).messages({
    "string.base": `"isbn" must be a string`,
    "string.pattern.base": `"isbn" is not valid`,
  }),
  shelfLocation: Joi.string().min(1).max(255).messages({
    "string.base": `"shelfLocation" must be a string`,
    "string.min": `"shelfLocation" should have at least {#limit} characters`,
    "string.max": `"shelfLocation" should not exceed {#limit} characters`,
  }),
  availableQty: Joi.number().integer().min(0).messages({
    "number.base": `"availableQty" must be a number`,
    "number.integer": `"availableQty" must be an integer`,
    "number.min": `"availableQty" must be at least {#limit}`,
  }),
});
