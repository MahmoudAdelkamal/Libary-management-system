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
      const totalQty = availableQty; // Initially, totalQty is equal to availableQty
      const newBook = await Book.create({
        title,
        author,
        isbn,
        availableQty,
        shelfLocation,
        totalQty,
      });
      return newBook;
    } catch (err) {
      const error = new Error(err.message);
      error.status = httpStatus.UNPROCESSABLE_ENTITY;
      throw error;
    }
  }

  async update(bookId, updates) {
    const book = await Book.findByPk(bookId);
    if (!book) {
      const error = new Error("Book is not found !");
      error.status = httpStatus.NOT_FOUND;
      throw error;
    }
    await book.update(updates);
    return book;
  }
}

export default BookService;
