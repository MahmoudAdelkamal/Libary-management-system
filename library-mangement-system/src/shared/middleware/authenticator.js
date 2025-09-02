import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import { configs } from "../../shared/utils/config.js";

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      error: "Invalid token",
    });
  }

  try {
    const decoded = jwt.verify(token, configs.JWT_SECRET);
    const borrowerId = parseInt(req.params.id);

    if (borrowerId && decoded.id !== borrowerId) {
      return res.status(httpStatus.FORBIDDEN).json({
        error: "Access denied",
      });
    }

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(httpStatus.UNAUTHORIZED).json({
        error: "Invalid token",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(httpStatus.UNAUTHORIZED).json({
        error: "Token expired",
      });
    }
  }
};
