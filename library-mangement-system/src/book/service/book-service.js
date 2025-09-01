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

  static async findAll(params = {}) {
    const {
      limit = 10,
      offset = 0,
      sortAttribute = "title",
      sortOrder = "ASC",
      searchTerm,
    } = params;

    const query = {
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortAttribute, sortOrder]],
      attributes: ["title", "author", "isbn", "availableQty", "shelfLocation"],
      raw: true,
    };

    if (searchTerm) {
      query.where = {
        [Op.or]: [
          { title: { [Op.iLike]: `%${searchTerm}%` } },
          { author: { [Op.iLike]: `%${searchTerm}%` } },
          { isbn: { [Op.iLike]: `%${searchTerm}%` } },
        ],
      };
    }

    try {
      const { count, rows: books } = await Book.findAndCountAll(query);
      return { total: count, data: books };
    } catch (error) {
      throw new Error(`Can't list books: ${error.message}`);
    }
  }
}

export default BookService;
