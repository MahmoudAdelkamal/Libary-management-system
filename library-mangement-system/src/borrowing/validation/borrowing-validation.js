import Joi from "joi";

export const borrowBookSchema = Joi.object({
  borrowerId: Joi.number().min(1).required(),
  bookId: Joi.number().min(1).required(),
  returnDate: Joi.date().min("now").required(),
});

export const returnBookSchema = Joi.object({
  borrowerId: Joi.number().min(1).required(),
  bookId: Joi.number().min(1).required(),
});

export const listLastMonthBorrowsSchema = Joi.object({
  onlyOverdue: Joi.boolean().default(false),
  limit: Joi.number().integer().min(5).max(50).default(10),
  offset: Joi.number().integer().min(0).default(0),
  sortAttribute: Joi.string()
    .valid("createdAt", "returnDate", "confirmedReturnDate")
    .default("createdAt"),
  sortOrder: Joi.string().valid("ASC", "DESC").default("ASC"),
});

export const borrowingProcessParamsSchema = Joi.object({
  id: Joi.number().min(1).required(),
});
