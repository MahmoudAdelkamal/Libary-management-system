import { Router } from "express";
import BooksRouter from "./book/router/book-router.js";

const router = Router();

router.use("/books", BooksRouter);

//health check
router.get("/health", (req, res) => {
  res.status(200).send({ status: "the server is up and running" });
});

export default router;
