import express from "express";

const router = express.Router();

router.post("/api/users/signout", async (req, res, next) => {
  req.session = null;

  res.send({});
});

export { router as signOutRouter };
