import { json } from "body-parser";
import express from "express";
import mongoose from "mongoose";

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/sign-in";
import { signOutRouter } from "./routes/sign-out";
import { signUpRouter } from "./routes/sign-up";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found";
import { DatabaseConnectionError } from "./errors/database-connection-error";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

app.all("*", () => {
  throw new NotFoundError();
});
app.use(errorHandler);

const main = async () => {
  // if (!process.env.MONGO_URI) {
  //   throw new Error("MONGO_URI must be defined");
  // }
  try {
    // await mongoose.connect(process.env.MONGO_URI);
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
    throw new DatabaseConnectionError();
  }

  app.listen(3000, () => {
    console.log("Auth listening on port 3000 🚀");
  });
};

main();
