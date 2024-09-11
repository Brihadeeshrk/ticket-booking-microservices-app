import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  // STEPS
  // create an instance of a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 100,
    userId: "122",
  });

  // save the ticket to the db
  await ticket.save();

  // fetch the ticket twice
  const instance1 = await Ticket.findById(ticket.id);
  const instance2 = await Ticket.findById(ticket.id);

  // make 2 separate changes to the ticket we fetched
  instance1!.set({ price: 10 });
  instance2!.set({ price: 15 });

  // save the 1st fetched tick
  await instance1!.save();

  // save the 2nd tick and expect an err
  try {
    await instance2!.save();
  } catch (error) {
    return;
  }

  throw new Error("should not reach this point");
});

it("increments the version number on multiple saves", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 100,
    userId: "122",
  });

  await ticket.save();
  expect(ticket.version).toBe(0);

  await ticket.save();
  expect(ticket.version).toBe(1);

  await ticket.save();
  expect(ticket.version).toBe(2);
});
