import { Router } from "express";
import BookController from "../controller/book-controller.js";
import { validateRequest } from "../../shared/middleware/request-validator.js";
import {
  createBookSchema,
  updateBookBodySchema,
  updateBookParamsSchema,
  deleteBookSchema,
} from "../validation/book-validation.js";

const BooksRouter = Router();

BooksRouter.post("/", validateRequest(createBookSchema), BookController.create);

BooksRouter.patch(
  "/:id",
  validateRequest(updateBookParamsSchema, "params"),
  validateRequest(updateBookBodySchema),
  BookController.update
);

BooksRouter.delete(
  "/:id",
  validateRequest(deleteBookSchema, "params"),
  BookController.delete
);

export default BooksRouter;
