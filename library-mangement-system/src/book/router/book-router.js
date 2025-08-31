import { Router } from "express";
import BookController from "../controller/book-controller.js";
import { validateRequest } from "../../shared/middleware/request-validator.js";
import { createBookSchema } from "../validation/book-validation.js";

const BooksRouter = Router();

BooksRouter.post("/", validateRequest(createBookSchema), BookController.create);

export default BooksRouter;
