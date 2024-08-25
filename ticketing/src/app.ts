import { json } from "body-parser";
import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { errorHandler, NotFoundError, currentUser } from "@brktickets/common";
import { newTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);
app.use(newTicketRouter);
app.use(showTicketRouter);

app.all("*", () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };

/**
GET /api/tickets - get all tix
GET /api/tickets/:id - get a single ticket
POST /api/tickets - {title, price} - create a new ticket
PUT /api/tickets/:id - {title, price} - update a ticket
 */
