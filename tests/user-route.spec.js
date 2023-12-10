const request = require("supertest");
const { toBeOneOf } = require("jest-extended");
const app = require("../src/app");
const validationRule = {
  classification: "required|string",
  name: "required|string",
};

describe("CHECK IF USERS ROUTES WORK", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test("creates a new user", async () => {
    await new Promise((r) => setTimeout(r, 2000));
    const newUser = {};
    const response = await request(app).post("/users").send(newUser);
    expect(response).toBeDefined();
  });

  test("returns a list of users", async () => {
    // await new Promise((r) => setTimeout(r, 1000));
    const response = await request(app).get("/users");
    expect(response).toBeDefined();
  });

  test("returns a specific user by ID", async () => {
    const userId = "6553ed082cc92b36dcfb2187";

    const response = await request(app).get(`/users/${userId}`);
    expect(response).toBeDefined();
  });

  test("updates a specific user by ID", async () => {
    const userId = "65752e69bc610e0675853429";
    let updatedUser = {
      classification: "SCOOBYupdated_classification",
      name: "updated_name",
    };

    const response = await request(app)
      .put(`/users/${userId}`)
      .send(updatedUser);
    expect(response).toBeDefined();
  });

  test("deletes a specific user by ID", async () => {
    const userId = "6575310b3a6a73e17bf34ac1";

    const response = await request(app).delete(`/users/${userId}`);
    expect(response).toBeDefined();
  });
});
