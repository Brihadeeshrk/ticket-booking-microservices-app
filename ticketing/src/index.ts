import mongoose from "mongoose";
import { DatabaseConnectionError } from "@brktickets/common";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

const main = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  try {
    await natsWrapper.connect("ticketing", "sdhjsdh", "http://nats-srv:4222");
    natsWrapper.client.on("close", () => {
      console.error("NATS connection closed");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
    throw new DatabaseConnectionError();
  }

  app.listen(3000, () => {
    console.log("Ticketing listening on port 3000 🚀");
  });
};

main();
