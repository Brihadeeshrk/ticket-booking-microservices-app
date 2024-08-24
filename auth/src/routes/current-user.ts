import express from "express";
import { currentUser } from "@brktickets/common";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, async (req, res, next) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
