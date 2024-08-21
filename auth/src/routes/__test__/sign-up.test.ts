import request from "supertest";
import { app } from "../../app";

it("it returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("it returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test.com",
      password: "password",
    })
    .expect(400);
});

it("it returns a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@etst.com",
      password: "rd",
    })
    .expect(400);
});

it("it returns a 400 with missing email and password", async () => {
  // finish this req first
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@te.com" })
    .expect(400);

  return request(app)
    .post("/api/users/signup")
    .send({ password: "password" })
    .expect(400);
});
