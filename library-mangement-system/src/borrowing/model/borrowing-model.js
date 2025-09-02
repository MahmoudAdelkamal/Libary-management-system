import { DataTypes } from "sequelize";
import { sequelize } from "../../shared/db/db_ctx.js";
import Book from "../../book/model/book-model.js";
import Borrower from "../../borrower/model/borrower-model.js";

const borrowingProcessSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  borrowerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Borrower,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Book,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  returnDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  confirmedReturnDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    defaultValue: null,
  },
};

const BorrowingProcess = sequelize.define(
  "borrowing_transactions",
  borrowingProcessSchema
);

BorrowingProcess.belongsTo(Borrower, { foreignKey: "borrowerId" });
BorrowingProcess.belongsTo(Book, { foreignKey: "bookId" });
export default BorrowingProcess;
