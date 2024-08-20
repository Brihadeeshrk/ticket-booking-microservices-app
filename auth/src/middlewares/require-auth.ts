import { Request, Response, NextFunction } from "express";
import { NotAuthorisedError } from "../errors/not-authorised-error";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.currentUser) {
    throw new NotAuthorisedError();
  }

  next();
}
