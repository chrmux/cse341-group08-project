const request = require("supertest");
const app = require("../src/app");
const { toBeOneOf } = require("jest-extended");
const validationRule = {
  classification: "required|string",
  name: "required|string",
};

describe("CHECK IF KEYWORDS ROUTES WORK", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test("creates a new keyword", async () => {
    await new Promise((r) => setTimeout(r, 2000));
    const newKeyword = {};
    const response = await request(app).post("/keywords").send(newKeyword);
    expect(response).toBeDefined();
  });

  test("returns a list of keywords", async () => {
    // await new Promise((r) => setTimeout(r, 1000));
    const response = await request(app).get("/keywords");
    expect(response).toBeDefined();
  });

  test("returns a specific keyword by ID", async () => {
    const keywordId = "6553ed082cc92b36dcfb2187";

    const response = await request(app).get(`/keywords/${keywordId}`);
    expect(response).toBeDefined();
  });

  test("updates a specific keyword by ID", async () => {
    const keywordId = "65752e69bc610e0675853429";
    let updatedKeyword = {
      classification: "SCOOBYupdated_classification",
      name: "updated_name",
    };

    const response = await request(app)
      .put(`/keywords/${keywordId}`)
      .send(updatedKeyword);
    expect(response).toBeDefined();
  });

  test("deletes a specific keyword by ID", async () => {
    const keywordId = "6575310b3a6a73e17bf34ac1";

    const response = await request(app).delete(`/keywords/${keywordId}`);
    expect(response).toBeDefined();
  });
});
