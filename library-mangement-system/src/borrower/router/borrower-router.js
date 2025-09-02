import { Router } from "express";
import BorrowerController from "../controller/borrower-controller.js";
import { stringToDate } from "../../shared/middleware/str-date-converter.js";
import {
  findAllBorrowersSchema,
  deleteBorrowerSchema,
  signUpBorrowerSchema,
  loginBorrowerSchema,
  updateBorrowerParamsSchema,
  updateBorrowerBodySchema,
  borrowParamsSchema,
  borrowBodySchema,
  returnBookParamsSchema,
} from "../validation/borrower-validation.js";
import { validateRequest } from "../../shared/middleware/request-validator.js";
import { authenticateToken } from "../../shared/middleware/authenticator.js";

const BorrowerRouter = Router();

BorrowerRouter.get(
  "/",
  validateRequest(findAllBorrowersSchema, "query"),
  BorrowerController.findAll
);

BorrowerRouter.patch(
  "/:id",
  authenticateToken,
  validateRequest(updateBorrowerParamsSchema, "params"),
  validateRequest(updateBorrowerBodySchema),
  BorrowerController.update
);

BorrowerRouter.delete(
  "/:id",
  authenticateToken,
  validateRequest(deleteBorrowerSchema, "params"),
  BorrowerController.delete
);

BorrowerRouter.post(
  "/sign-up",
  validateRequest(signUpBorrowerSchema),
  BorrowerController.signUp
);

BorrowerRouter.post(
  "/login",
  validateRequest(loginBorrowerSchema),
  BorrowerController.login
);

BorrowerRouter.post(
  "/:id/books/:bookId/borrow",
  authenticateToken,
  validateRequest(borrowParamsSchema, "params"),
  validateRequest(borrowBodySchema),
  stringToDate("returnDate"),
  BorrowerController.borrowBook
);

BorrowerRouter.post(
  "/:id/books/:bookId/return",
  authenticateToken,
  validateRequest(returnBookParamsSchema, "params"),
  BorrowerController.returnBook
);

export default BorrowerRouter;
