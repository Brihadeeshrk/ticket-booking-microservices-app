import express from "express";

const router = express.Router();

router.post("/api/users/signout", async (req, res, next) => {
  res.send("this is the signout route");
});

export { router as signOutRouter };
