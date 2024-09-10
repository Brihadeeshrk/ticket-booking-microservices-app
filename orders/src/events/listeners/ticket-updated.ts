import {
  Listener,
  NotFoundError,
  Subjects,
  TicketUpdatedEvent,
} from "@brktickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { QUEUE_NAME } from "./queue-group-names";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = QUEUE_NAME;

  async onMessage(
    data: { id: string; title: string; price: number; userId: string },
    msg: Message
  ): Promise<void> {
    const { id, title, price } = data;

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      throw new Error("ticket not found!");
    }

    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  }
}
