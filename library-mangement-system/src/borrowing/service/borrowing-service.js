import httpStatus from "http-status";
import { Op } from "sequelize";
import { sequelize } from "../../shared/db/db_ctx.js";
import Book from "../../book/model/book-model.js";
import Borrower from "../../borrower/model/borrower-model.js";
import BorrowingProcess from "../model/borrowing-model.js";

class BorrowingProcessService {
  static async borrowBook(borrowerId, bookId, returnDate) {
    const book = await Book.findById(bookId);

    const existingBorrowingTransaction = await BorrowingProcess.findOne({
      where: { borrowerId, bookId, confirmedReturnDate: null },
    });

    if (existingBorrowingTransaction) {
      const error = new Error("This Book is already borrowed by this user!");
      error.status = httpStatus.CONFLICT;
      throw error;
    }

    if (book.availableQty === 0) {
      const error = new Error("Currently there are no copies available!");
      error.status = httpStatus.UNPROCESSABLE_ENTITY;
      throw error;
    }

    const transaction = await sequelize.transaction();
    try {
      await book.decrement({ availableQty: 1 }, { transaction });
      const borrowing = await BorrowingProcess.create(
        {
          borrowerId,
          bookId,
          returnDate,
        },
        { transaction }
      );

      await transaction.commit();
      return borrowing;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async returnBook(borrowerId, bookId) {
    const book = await Book.findById(bookId);

    const activeBorrowingTransaction = await BorrowingProcess.findOne({
      where: { borrowerId, bookId, confirmedReturnDate: null },
    });

    if (!activeBorrowingTransaction) {
      const error = new Error(
        "No active borrowing found for this book and user!"
      );
      error.status = httpStatus.NOT_FOUND;
      throw error;
    }

    const transaction = await sequelize.transaction();
    try {
      await book.increment({ availableQty: 1 }, { transaction });

      activeBorrowingTransaction.confirmedReturnDate = new Date();
      await activeBorrowingTransaction.save({ transaction });

      await transaction.commit();
      return activeBorrowingTransaction;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async listLastMonthBorrows(onlyOverdue = false) {
    try {
      const now = new Date();
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
      const startDate = new Date(
        lastMonth.getFullYear(),
        lastMonth.getMonth(),
        1
      );
      const endDate = new Date(
        lastMonth.getFullYear(),
        lastMonth.getMonth() + 1,
        0
      );

      const where = {
        createdAt: { [Op.between]: [startDate, endDate] },
      };

      if (onlyOverdue) {
        where[Op.or] = [
          { confirmedReturnDate: null },
          sequelize.where(
            sequelize.col("confirmedReturnDate"),
            Op.gt,
            sequelize.col("returnDate")
          ),
        ];
      }

      return await BorrowingProcess.findAll({
        where,
        include: [
          { model: Borrower, attributes: ["name", "email"] },
          { model: Book, attributes: ["title", "author"] },
        ],
        order: [["createdAt", "ASC"]],
      });
    } catch (error) {
      const err = new Error(
        `Error listing last month borrows: ${error.message}`
      );
      err.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw err;
    }
  }
}
export default BorrowingProcessService;
