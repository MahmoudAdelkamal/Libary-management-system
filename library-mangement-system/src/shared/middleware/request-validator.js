import httpStatus from "http-status";

export const validateRequest = (schema, target = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[target], { abortEarly: false });

    if (error) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "error",
        message: `Validation error on the request's ${target}`,
        details: error.details.map((err) => err.message),
      });
    }
    next();
  };
};
