import express from "express";

const router = express.Router();

router.post("/api/users/signin", async (req, res, next) => {
  res.send("this is the sign in route");
});

export { router as signInRouter };
