import { Listener, OrderCancelledEvent, Subjects } from "@brktickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated";
import { QUEUE_NAME } from "./queue-group-names";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = QUEUE_NAME;

  async onMessage(
    data: { id: string; version: number; ticket: { id: string } },
    msg: Message
  ): Promise<void> {
    // find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);
    // if there is no ticket, then throw an err
    if (!ticket) {
      throw new Error("ticket not found!");
    }
    // mark the ticket as being as reserved by setting the orderId property
    ticket.set({ orderId: undefined });
    // save the ticket
    await ticket.save();
    // ack the message
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      version: ticket.version,
      orderId: ticket.orderId,
    });

    msg.ack();
  }
}
