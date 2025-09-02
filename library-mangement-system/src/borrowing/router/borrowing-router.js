import { Router } from "express";
import { listLastMonthBorrowsSchema } from "../validation/borrowing-validation.js";
import BorrowingProcessesController from "../controller/borrowing-controller.js";
import { validateRequest } from "../../shared/middleware/request-validator.js";

const BorrowingProcessRouter = Router();

BorrowingProcessRouter.get(
  "/overdue",
  BorrowingProcessesController.listOverdueBooks
);
BorrowingProcessRouter.get(
  "/last-month-borrows",
  validateRequest(listLastMonthBorrowsSchema, "query"),
  BorrowingProcessesController.listLastMonthBorrows
);

export default BorrowingProcessRouter;
