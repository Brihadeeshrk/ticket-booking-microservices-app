import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";

it("returns an error if the ticket doesnt exist", async () => {
  const ticketId = new mongoose.Types.ObjectId();
  const cookie = global.signin();
  await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({ ticketId })
    .expect(404);
});

it("returns an error if the ticket is reserved", async () => {
  const cookie = global.signin();
  const ticket = Ticket.build({
    title: "Test Ticket",
    price: 200,
  });
  await ticket.save();

  const order = Order.build({
    ticket,
    userId: "fjhfjjshdjhdj",
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({ ticketId: ticket.id })
    .expect(400);
});

it("reserves a ticket", async () => {
  const cookie = global.signin();

  const ticket = Ticket.build({
    title: "Test Ticket",
    price: 200,
  });
  await ticket.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({ ticketId: ticket.id })
    .expect(201);
});

it.todo("emits an order created event");
