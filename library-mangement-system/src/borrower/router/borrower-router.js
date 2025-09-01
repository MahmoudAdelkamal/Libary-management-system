import { Router } from "express";
import BorrowerController from "../controller/borrower-controller.js";
import { findAllBorrowersSchema } from "../validation/borrower-validation.js";
import { validateRequest } from "../../shared/middleware/request-validator.js";

const BorrowerRouter = Router();
BorrowerRouter.get(
  "/",
  validateRequest(findAllBorrowersSchema, "query"),
  BorrowerController.findAll
);

export default BorrowerRouter;
