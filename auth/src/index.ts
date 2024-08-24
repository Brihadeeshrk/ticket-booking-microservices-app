import mongoose from "mongoose";
import { DatabaseConnectionError } from "@brktickets/common";
import { app } from "./app";

const main = async () => {
  // if (!process.env.MONGO_URI) {
  //   throw new Error("MONGO_URI must be defined");
  // }
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
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
