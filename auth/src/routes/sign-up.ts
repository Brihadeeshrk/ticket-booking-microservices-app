import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

interface Body {
  email: string;
  password: string;
}

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // return res.status(400).send(errors.array());
      throw new Error("Invalid email or password");
    }

    const { email, password } = req.body as Body;

    console.log("Creating a new user ...");
    throw new Error("Error connecting to DB ...");

    res.send({});
  }
);

export { router as signUpRouter };
