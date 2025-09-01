import { Router } from "express";
import BookController from "../controller/book-controller.js";
import { validateRequest } from "../../shared/middleware/request-validator.js";
import {
  createBookSchema,
  updateBookBodySchema,
  updateBookParamsSchema,
} from "../validation/book-validation.js";

const BooksRouter = Router();

BooksRouter.post("/", validateRequest(createBookSchema), BookController.create);

BooksRouter.patch(
  "/:id",
  validateRequest(updateBookParamsSchema, "params"),
  validateRequest(updateBookBodySchema),
  BookController.update
);

export default BooksRouter;
