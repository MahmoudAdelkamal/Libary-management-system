import { DataTypes } from "sequelize";
import { sequelize } from "../../shared/db/db_ctx.js";
import { EMAIL_REGEX } from "../../shared/utils/constants.js";
const BorrowerSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: EMAIL_REGEX,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  registeredAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
};
const Borrower = sequelize.define("borrower", BorrowerSchema);

export default Borrower;
