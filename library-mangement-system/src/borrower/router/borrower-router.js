import { Router } from "express";
import BorrowerController from "../controller/borrower-controller.js";
import {
  findAllBorrowersSchema,
  deleteBorrowerSchema,
  signUpBorrowerSchema,
  loginBorrowerSchema,
  updateBorrowerParamsSchema,
  updateBorrowerBodySchema,
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

export default BorrowerRouter;
