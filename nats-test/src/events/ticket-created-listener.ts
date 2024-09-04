import { Listener } from "./base-listener";
import { Message } from "node-nats-streaming";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./types";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = "payments-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log(data);

    msg.ack();
  }
}
