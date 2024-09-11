import { Listener, Subjects, TicketCreatedEvent } from "@brktickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { QUEUE_NAME } from "./queue-group-names";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = QUEUE_NAME;

  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price } = data;

    const ticket = Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();

    msg.ack();
  }
}
