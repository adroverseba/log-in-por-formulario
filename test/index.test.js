const request = require("supertest");
// const router = require("../routes/productRouter");
const app = require("../server");

describe("GET /api/productos-test", () => {
  test("should respond with a 200 status code ", async () => {
    const response = await request(app).get("/api/productos-test");
    expect(response.statusCode).toBe(200);
  });

  test("should have a content-type: application/json in header", async () => {
    const response = await request(app).get("/api/productos-test");
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});

describe("POST", () => {
  const newProduct = {
    title: "some title",
    price: 999,
    thumbnail: "some url",
  };

  test("should respond with a 201 status code", async () => {
    const response = await request(app)
      .post("/api/productos-test")
      .send(newProduct);
    expect(response.statusCode).toBe(201);
  });
});

describe("PATCH", () => {
  test("should respond with a update object", async () => {
    const response = await request(app)
      .patch("/api/productos-test/:id")
      .send({ price: 999 });
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("DELETE", () => {
  test("should respond with id", async () => {
    const id = 2;
    const response = await request(app).delete(`/api/productos-test/${id}`);
    expect(response.statusCode).toBe(200);
  });
});
