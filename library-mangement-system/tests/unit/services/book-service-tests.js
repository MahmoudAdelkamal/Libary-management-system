import Book from "../../src/book/model/book-model.js";
import BookService from "../../src/book/service/book-service.js";
import httpStatus from "http-status";
import { Op } from "sequelize";

// Mock the Book model
jest.mock("../../src/book/model/book-model.js");

describe("BookService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a new book successfully", async () => {
      const bookData = {
        title: "Test Book",
        author: "Test Author",
        isbn: "1234567890",
        availableQty: 5,
        shelfLocation: "A1",
      };

      const mockCreatedBook = {
        id: 1,
        ...bookData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      Book.create.mockResolvedValue(mockCreatedBook);

      const result = await BookService.create(bookData);

      expect(Book.create).toHaveBeenCalledWith(bookData);
      expect(result).toEqual(mockCreatedBook);
    });

    it("should throw an error with UNPROCESSABLE_ENTITY status when creation fails", async () => {
      const bookData = {
        title: "Test Book",
        author: "Test Author",
        isbn: "1234567890",
        availableQty: 5,
        shelfLocation: "A1",
      };

      const mockError = new Error("Validation error");
      Book.create.mockRejectedValue(mockError);

      await expect(BookService.create(bookData)).rejects.toMatchObject({
        message: "Validation error",
        status: httpStatus.UNPROCESSABLE_ENTITY,
      });

      expect(Book.create).toHaveBeenCalledWith(bookData);
    });
  });

  describe("update", () => {
    it("should update a book successfully", async () => {
      const bookId = 1;
      const updates = { title: "Updated Title", availableQty: 10 };

      const mockBook = {
        id: bookId,
        title: "Original Title",
        author: "Test Author",
        isbn: "1234567890",
        availableQty: 5,
        shelfLocation: "A1",
        update: jest.fn().mockResolvedValue(undefined),
      };

      Book.findByPk.mockResolvedValue(mockBook);

      const result = await BookService.update(bookId, updates);

      expect(Book.findByPk).toHaveBeenCalledWith(bookId);
      expect(mockBook.update).toHaveBeenCalledWith(updates);
      expect(result).toBe(mockBook);
    });

    it("should throw NOT_FOUND error when book does not exist", async () => {
      const bookId = 999;
      const updates = { title: "Updated Title" };

      Book.findByPk.mockResolvedValue(null);

      await expect(BookService.update(bookId, updates)).rejects.toMatchObject({
        message: "Book is not found !",
        status: httpStatus.NOT_FOUND,
      });

      expect(Book.findByPk).toHaveBeenCalledWith(bookId);
    });
  });

  describe("delete", () => {
    it("should delete a book successfully", async () => {
      const bookId = 1;

      const mockBook = {
        id: bookId,
        title: "Test Book",
        author: "Test Author",
        isbn: "1234567890",
        availableQty: 5,
        shelfLocation: "A1",
        destroy: jest.fn().mockResolvedValue(undefined),
      };

      Book.findByPk.mockResolvedValue(mockBook);

      const result = await BookService.delete(bookId);

      expect(Book.findByPk).toHaveBeenCalledWith(bookId);
      expect(mockBook.destroy).toHaveBeenCalled();
      expect(result).toBe(mockBook);
    });

    it("should throw NOT_FOUND error when book does not exist", async () => {
      const bookId = 999;

      Book.findByPk.mockResolvedValue(null);

      await expect(BookService.delete(bookId)).rejects.toMatchObject({
        message: "Book is not found !",
        status: httpStatus.NOT_FOUND,
      });

      expect(Book.findByPk).toHaveBeenCalledWith(bookId);
    });
  });

  describe("findAll", () => {
    const mockBooks = [
      {
        title: "Book 1",
        author: "Author 1",
        isbn: "1111111111",
        availableQty: 3,
        shelfLocation: "A1",
      },
      {
        title: "Book 2",
        author: "Author 2",
        isbn: "2222222222",
        availableQty: 7,
        shelfLocation: "B2",
      },
    ];

    it("should return all books with default parameters", async () => {
      const mockResult = {
        count: 2,
        rows: mockBooks,
      };

      Book.findAndCountAll.mockResolvedValue(mockResult);

      const result = await BookService.findAll();

      expect(Book.findAndCountAll).toHaveBeenCalledWith({
        limit: 10,
        offset: 0,
        order: [["title", "ASC"]],
        attributes: [
          "title",
          "author",
          "isbn",
          "availableQty",
          "shelfLocation",
        ],
        raw: true,
      });

      expect(result).toEqual({
        total: 2,
        data: mockBooks,
      });
    });

    it("should return books with custom parameters", async () => {
      const params = {
        limit: 5,
        offset: 10,
        sortAttribute: "author",
        sortOrder: "DESC",
      };

      const mockResult = {
        count: 15,
        rows: mockBooks,
      };

      Book.findAndCountAll.mockResolvedValue(mockResult);

      const result = await BookService.findAll(params);

      expect(Book.findAndCountAll).toHaveBeenCalledWith({
        limit: 5,
        offset: 10,
        order: [["author", "DESC"]],
        attributes: [
          "title",
          "author",
          "isbn",
          "availableQty",
          "shelfLocation",
        ],
        raw: true,
      });

      expect(result).toEqual({
        total: 15,
        data: mockBooks,
      });
    });

    it("should return books with search term", async () => {
      const params = {
        searchTerm: "test",
      };

      const expectedQuery = {
        limit: 10,
        offset: 0,
        order: [["title", "ASC"]],
        attributes: [
          "title",
          "author",
          "isbn",
          "availableQty",
          "shelfLocation",
        ],
        raw: true,
        where: {
          [Op.or]: [
            { title: { [Op.iLike]: "%test%" } },
            { author: { [Op.iLike]: "%test%" } },
            { isbn: { [Op.iLike]: "%test%" } },
          ],
        },
      };

      const mockResult = {
        count: 1,
        rows: [mockBooks[0]],
      };

      Book.findAndCountAll.mockResolvedValue(mockResult);

      const result = await BookService.findAll(params);

      expect(Book.findAndCountAll).toHaveBeenCalledWith(expectedQuery);
      expect(result).toEqual({
        total: 1,
        data: [mockBooks[0]],
      });
    });

    it("should handle string parameters by converting them to integers", async () => {
      const params = {
        limit: "15",
        offset: "20",
      };

      const mockResult = {
        count: 100,
        rows: mockBooks,
      };

      Book.findAndCountAll.mockResolvedValue(mockResult);

      await BookService.findAll(params);

      expect(Book.findAndCountAll).toHaveBeenCalledWith({
        limit: 15,
        offset: 20,
        order: [["title", "ASC"]],
        attributes: [
          "title",
          "author",
          "isbn",
          "availableQty",
          "shelfLocation",
        ],
        raw: true,
      });
    });

    it("should throw an error when database query fails", async () => {
      const dbError = new Error("Database connection failed");
      Book.findAndCountAll.mockRejectedValue(dbError);

      await expect(BookService.findAll()).rejects.toThrow(
        "Can't list books: Database connection failed"
      );

      expect(Book.findAndCountAll).toHaveBeenCalled();
    });

    it("should handle empty results", async () => {
      const mockResult = {
        count: 0,
        rows: [],
      };

      Book.findAndCountAll.mockResolvedValue(mockResult);

      const result = await BookService.findAll();

      expect(result).toEqual({
        total: 0,
        data: [],
      });
    });
  });
});

// Additional test for edge cases and error scenarios
describe("BookService - Edge Cases", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handle null/undefined parameters in create method", async () => {
    const bookData = {
      title: null,
      author: undefined,
      isbn: "1234567890",
      availableQty: 5,
      shelfLocation: "A1",
    };

    const mockError = new Error("Title cannot be null");
    Book.create.mockRejectedValue(mockError);

    await expect(BookService.create(bookData)).rejects.toMatchObject({
      message: "Title cannot be null",
      status: httpStatus.UNPROCESSABLE_ENTITY,
    });
  });

  it("should handle update with empty updates object", async () => {
    const bookId = 1;
    const updates = {};

    const mockBook = {
      id: bookId,
      title: "Test Book",
      update: jest.fn().mockResolvedValue(undefined),
    };

    Book.findByPk.mockResolvedValue(mockBook);

    const result = await BookService.update(bookId, updates);

    expect(mockBook.update).toHaveBeenCalledWith({});
    expect(result).toBe(mockBook);
  });
});
