import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", async (req, res, next) => {
  res.send("this is the current user");
});

export { router as currentUserRouter };
