import {
  Listener,
  OrderStatus,
  PaymentCreatedEvent,
  Subjects,
} from "@brktickets/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { QUEUE_NAME } from "./queue-group-names";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName: string = QUEUE_NAME;

  async onMessage(
    data: { id: string; orderId: string; stripeId: string },
    msg: Message
  ): Promise<void> {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error("Order not found!");
    }

    order.set({
      status: OrderStatus.Complete,
    });
    await order.save();

    msg.ack();
  }
}
