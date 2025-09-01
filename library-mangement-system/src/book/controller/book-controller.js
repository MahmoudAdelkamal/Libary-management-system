import BookService from "../service/book-service.js";
import httpStatus from "http-status";

class BookController {
  static async create(req, res) {
    try {
      const newBook = await BookService.create(req.body);

      res.status(httpStatus.CREATED).json({
        message: "A new Book is added successfully !",
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
        message: "Book updated successfully !",
        book: updatedBook,
      });
    } catch (error) {
      res
        .status(error.status || httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const bookId = req.params.id;
      await BookService.delete(bookId);
      res
        .status(httpStatus.OK)
        .json({ message: "Book deleted successfully !" });
    } catch (error) {
      res
        .status(error.status || httpStatus.NOT_FOUND)
        .json({ error: error.message });
    }
  }

  static async findAll(req, res) {
    try {
      const { total, data: books } = await BookService.findAll(req.query);
      res.status(httpStatus.OK).json({
        message: "success",
        total,
        books,
      });
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }
}

export default BookController;
