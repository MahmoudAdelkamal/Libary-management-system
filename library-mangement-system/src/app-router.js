import { Router } from "express";
import BooksRouter from "./book/router/book-router.js";
import BorrowerRouter from "./borrower/router/borrower-router.js";
import BorrowingProcessRouter from "./borrowing/router/borrowing-router.js";
const router = Router();

router.use("/books", BooksRouter);

router.use("/borrowers", BorrowerRouter);

router.use("/borrowings", BorrowingProcessRouter);

//health check
router.get("/health", (req, res) => {
  res.status(200).send({ status: "the server is up and running" });
});

export default router;
