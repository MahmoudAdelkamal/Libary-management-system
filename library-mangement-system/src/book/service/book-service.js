import Book from "../model/book-model.js";
import httpStatus from "http-status";

class BookService {
  async findById(BookId) {
    const book = await Book.findByPk(BookId);
    if (!book) {
      const error = new Error("Book is not found !");
      error.status = httpStatus.NOT_FOUND;
      throw error;
    }
    return book;
  }
  static async create({ title, author, isbn, availableQty, shelfLocation }) {
    try {
      const newBook = await Book.create({
        title,
        author,
        isbn,
        availableQty,
        shelfLocation,
      });
      return newBook;
    } catch (err) {
      const error = new Error(err.message);
      error.status = httpStatus.UNPROCESSABLE_ENTITY;
      throw error;
    }
  }

  static async update(bookId, updates) {
    const book = await Book.findByPk(bookId);
    if (!book) {
      const error = new Error("Book is not found !");
      error.status = httpStatus.NOT_FOUND;
      throw error;
    }
    await book.update(updates);
    return book;
  }

  static async delete(bookId) {
    const book = await Book.findByPk(bookId);
    if (!book) {
      const error = new Error("Book is not found !");
      error.status = httpStatus.NOT_FOUND;
      throw error;
    }
    await book.destroy();
    return book;
  }
}

export default BookService;
