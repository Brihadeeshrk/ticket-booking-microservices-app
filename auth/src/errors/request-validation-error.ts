import { ValidationError } from "express-validator";
import { CustomError } from "../utils/types";

// the approach of using an interface to specify the required properties is totally okay and acceptable, but one thing to consider is that
// interfaces only exist is TS and not JS
// so when the code is transpiled into JS, all this goes away

// one alternate approach to make sure the code will always work is by using abstract classes, the database-connection-error extends this CustomError class
// but, i've provided both examples here

export class RequestValidationError extends Error implements CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super();

    // Needed only because of extending a built-in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      if (error.type === "field") {
        return { message: error.msg, field: error.path };
      }
      return { message: error.msg };
    });
  }
}
