import { DataTypes } from "sequelize";
import { sequelize } from "../../shared/db/db_ctx.js";
import { ISBN_REGEX } from "../../shared/utils/constants.js";

const bookSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: ISBN_REGEX,
    },
  },
  availableQty: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  shelfLocation: {
    type: DataTypes.STRING,
    allowNull: false,
    allowEmpty: false,
  },
  totalQty: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
};

const Book = sequelize.define("book", bookSchema);

export default Book;
