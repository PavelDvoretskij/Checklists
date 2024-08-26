export default class ApiErrors extends Error {
  status;
  errors;

  constructor(message, statusCode, errors = []) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}
