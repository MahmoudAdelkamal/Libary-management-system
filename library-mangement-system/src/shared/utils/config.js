import { config } from "dotenv";
config();
export const configs = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  DB_URL: process.env.DB_URL,
};
