import express from "express";
import { json } from "body-parser";

const app = express();
app.use(json());

app.get("/api/users/currentuser", async (req, res, next) => {
  res.send("hey there!");
});

app.listen(3000, () => {
  console.log("Auth listening on port 3000 🚀");
});

/**
 * ROUTES
 * /api/users/signup
 * /api/users/signin
 * /api/users/signout
 * /api/users/currentuser
 */
