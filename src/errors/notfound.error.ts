import CustomError from "./custom.error";

export class NotFoundError extends CustomError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export default NotFoundError;
