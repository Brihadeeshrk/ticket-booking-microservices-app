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
    data: TicketUpdatedEvent["data"],
    msg: Message
  ): Promise<void> {
    const { id, title, price, version } = data;

    const ticket = await Ticket.findByEvent(data);

    if (!ticket) {
      throw new Error("ticket not found!");
    }

    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  }
}
