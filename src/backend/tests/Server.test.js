const request = require("supertest");
const app = require("../Server");

const allowedOrigin = "http://localhost:3000";

const request = require("supertest");
const app = require("../Server"); // This should export just the Express app

describe("API route health checks with origin", () => {
  it("should allow /mongo request from allowed origin", async () => {
    const res = await request(app)
      .get("/mongo")
      .set("Origin", allowedOrigin);

    expect(res.statusCode).toBeGreaterThanOrEqual(200);
  });

  it("should reject /mongo request from disallowed origin", async () => {
    const res = await request(app)
      .get("/mongo")
      .set("Origin", "http://evil.com");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Unauthorized");
  });

  it("should allow /sql request from allowed origin", async () => {
    const res = await request(app)
      .get("/sql")
      .set("Origin", allowedOrigin);

    expect(res.statusCode).toBeGreaterThanOrEqual(200);
  });

  it("should allow /dynamo request from allowed origin", async () => {
    const res = await request(app)
      .get("/dynamo")
      .set("Origin", allowedOrigin);

    expect(res.statusCode).toBeGreaterThanOrEqual(200);
  });
});
