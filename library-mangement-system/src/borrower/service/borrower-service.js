import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import { configs } from "../../shared/utils/config.js";
import Borrower from "../model/borrower-model.js";
class BorrowerService {
  static async signUp({ name, email, password }) {
    const existingEmail = await this.checkForExistingEmail(email);
    if (existingEmail) {
      const error = new Error("Email already in use !");
      error.status = httpStatus.CONFLICT;
      throw error;
    }
    const hashedPassword = await this.hashPassword(password);
    const newBorrower = await Borrower.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = this.generateAuthToken(newBorrower.id);
    return { token, borrower: newBorrower };
  }

  static async checkForExistingEmail(email) {
    const existingBorrower = await Borrower.findOne({ where: { email } });
    return existingBorrower !== null;
  }

  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  static async generateAuthToken(borrowerId) {
    const token = jwt.sign({ id: borrowerId }, configs.JWT_SECRET, {
      expiresIn: "3d",
    });
    return token;
  }

  static async login({ email, password }) {
    const borrower = await Borrower.findOne({ where: { email } });
    if (!borrower) {
      const error = new Error("Invalid email or password");
      error.status = httpStatus.UNAUTHORIZED;
      throw error;
    }
    const isPasswordValid = await bcrypt.compare(password, borrower.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid email or password");
      error.status = httpStatus.UNAUTHORIZED;
      throw error;
    }
    const token = jwt.sign({ id: borrower.id }, configs.JWT_SECRET, {
      expiresIn: "3d",
    });
    return { token, borrower };
  }

  static async update(borrowerId, updates) {
    const borrower = await Borrower.findByPk(borrowerId);
    if (!borrower) {
      const error = new Error("Borrower not found");
      error.status = httpStatus.NOT_FOUND;
      throw error;
    }
    return borrower.update(updates);
  }

  static async delete(borrowerId) {
    const borrower = await Borrower.findByPk(borrowerId);
    if (!borrower) {
      const error = new Error("Borrower not found");
      error.status = httpStatus.NOT_FOUND;
      throw error;
    }

    await borrower.destroy();
    return true;
  }

  static async findAll({
    limit = 10,
    offset = 0,
    sortAttribute = "registeredAt",
    sortOrder = "ASC",
  }) {
    try {
      const query = {
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [[sortAttribute, sortOrder]],
        attributes: ["id", "name", "email", "registeredAt"],
        raw: true,
      };

      const { count, rows: borrowers } = await Borrower.findAndCountAll(query);
      return { total: count, data: borrowers };
    } catch (error) {
      throw new Error("Error fetching borrowers");
    }
  }
}
export default BorrowerService;
