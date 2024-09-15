import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@brktickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
