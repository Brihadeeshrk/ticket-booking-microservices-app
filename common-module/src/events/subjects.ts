// a list of all the subjects/ event names our application can listen to

export enum Subjects {
  TicketCreated = "ticket:created",
  TicketUpdated = "ticket:updated",
  OrderCreated = "order:created",
  OrderCancelled = "order:cancelled",
  ExpirationComplete = "expiration:complete",
  PaymentCreated = "payment:created",
}
