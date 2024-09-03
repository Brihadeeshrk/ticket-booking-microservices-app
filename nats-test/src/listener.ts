import { randomBytes } from "crypto";
import nats from "node-nats-streaming";
import { TicketCreatedListener } from "./events/ticket-created-listener";

console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("🚀 Listener connected to NATS");

  stan.on("close", () => {
    console.log("🚀 NATS connection closed!");
    process.exit();
  });

  new TicketCreatedListener(stan).listen();

  // const options = stan
  //   .subscriptionOptions()
  //   .setManualAckMode(true)
  //   .setDeliverAllAvailable()
  //   .setDurableName("orders-service");

  // const subscription = stan.subscribe(
  //   "ticket:created",
  //   "orders-service-queue-group",
  //   options
  // );

  // subscription.on("message", (msg: Message) => {
  //   const data = msg.getData();

  //   if (typeof data === "string") {
  //     console.log(
  //       `Received event #${msg.getSequence()} on subject: ${msg.getSubject()}`
  //     );
  //     console.log(data);
  //   }

  //   msg.ack();
  // });
});

// if we get a sigint or sigterm, we're going to close the connection to nats
// these are listening for the terminal signals
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
