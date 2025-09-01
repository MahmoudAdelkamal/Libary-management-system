import BookService from "../service/book-service.js";
import httpStatus from "http-status";

class BookController {
  static async create(req, res) {
    try {
      const newBook = await BookService.create(req.body);

      res.status(httpStatus.CREATED).json({
        message: "A new Book is added successfully",
        book: newBook,
      });
    } catch (error) {
      res
        .status(error.status || httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const updatedBook = await BookService.update(req.params.id, req.body);
      res.status(httpStatus.OK).json({
        message: "Book updated successfully",
        book: updatedBook,
      });
    } catch (error) {
      res
        .status(error.status || httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}

export default BookController;
