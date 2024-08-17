export class DatabaseConnectionError extends Error {
  reason = "Error connecting to database";
  statusCode = 500;
  constructor() {
    super();
    // Needed only because of extending a built-in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
