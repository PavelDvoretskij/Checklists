// import ApiError from "../exceptions/api-errors.js";
//
// export default function (err, req, res, next) {
//   if (err instanceof ApiError) {
//     return res.status(err.status).json({ message: err.message });
//   }
//   return res.status(500).json({ message: "Непредвиденная ошибка" });
// }

export default (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
};
