import httpStatus from "http-status";
import BorrowerService from "../service/borrower-service.js";
import BorrowingProcess from "../../borrowing/model/borrowing-model.js";
import BorrowingProcessService from "../../borrowing/service/borrowing-service.js";
class BorrowerController {
  static async signUp(req, res) {
    try {
      const { token, borrower } = await BorrowerService.signUp(req.body);
      res.status(httpStatus.CREATED).json({
        message: "Borrower registered successfully",
        token,
        borrower: borrower.toJSON(),
      });
    } catch (error) {
      res
        .status(error.status || httpStatus.BAD_REQUEST)
        .json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { token, borrower } = await BorrowerService.login(req.body);
      res.status(httpStatus.CREATED).json({
        message: "Borrower logged-in successfully",
        token,
        borrower: borrower.toJSON(),
      });
    } catch (error) {
      res
        .status(error.status || httpStatus.BAD_REQUEST)
        .json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const borrowerId = req.params.id;
      const updatedBorrower = await BorrowerService.update(
        borrowerId,
        req.body
      );

      res.status(httpStatus.OK).json({
        message: "Borrower updated successfully",
        Borrower: updatedBorrower.toJSON(),
      });
    } catch (error) {
      res
        .status(error.status || httpStatus.NOT_FOUND)
        .json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const borrowerId = req.params.id;
      await BorrowerService.delete(borrowerId);
      res
        .status(httpStatus.OK)
        .json({ message: "Borrower deleted successfully" });
    } catch (error) {
      res
        .status(error.status || httpStatus.NOT_FOUND)
        .json({ error: error.message });
    }
  }

  static async findAll(req, res) {
    try {
      const { total, data: borrowers } = await BorrowerService.findAll(
        req.query
      );
      res.status(httpStatus.OK).json({
        message: "Success",
        total,
        borrowers,
      });
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }

  static async borrowBook(req, res) {
    try {
      const borrowerId = req.params.id;
      const bookId = req.params.bookId;

      const borrowProcess = await BorrowingProcessService.borrowBook(
        borrowerId,
        bookId,
        req.body.returnDate
      );
      const { returnDate } = borrowProcess.toJSON();
      res.status(httpStatus.CREATED).json({
        message: "the borrowing process is done successfully",
        borrowerId,
        bookId,
        returnDate,
      });
    } catch (error) {
      res
        .status(error.status || httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  static async returnBook(req, res) {
    try {
      const borrowerId = req.params.id;
      const bookId = req.params.bookId;

      const returnTransaction = await BorrowingProcessService.returnBook(
        borrowerId,
        bookId
      );
      const { confirmedReturnDate } = returnTransaction.toJSON();
      res.status(httpStatus.OK).json({
        message: "returning the book is done successfully!",
        borrowerId,
        bookId,
        confirmedReturnDate,
      });
    } catch (error) {
      res
        .status(error.status || httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }
}

export default BorrowerController;
