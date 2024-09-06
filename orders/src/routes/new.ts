import { requireAuth, validateRequest } from "@brktickets/common";
import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  //   [
  //     body("title").not().isEmpty().withMessage("Title is required"),
  //     body("price")
  //       .isFloat({ gt: 0 })
  //       .withMessage("Price must be greater than 0"),
  //   ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    res.send({});
  }
);

export { router as newOrderRouter };
