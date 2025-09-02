import httpStatus from "http-status";
import BorrowingProcessService from "../service/borrowing-service.js";
class BorrowingProcessesController {
  static async listOverdueBooks(req, res) {
    try {
      const overdueBooks = await BorrowingProcessService.listLastMonthBorrows(
        true
      );

      res.status(httpStatus.OK).json({
        message: "success",
        count: overdueBooks.length,
        data: overdueBooks,
      });
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }

  static async listLastMonthBorrows(req, res) {
    try {
      const borrows = await BorrowingProcessService.listLastMonthBorrows();
      res.status(httpStatus.OK).json({
        message: "success",
        count: borrows.length,
        data: borrows,
      });
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }
}

export default BorrowingProcessesController;
