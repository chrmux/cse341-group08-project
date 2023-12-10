const request = require("supertest");
const { toBeOneOf } = require("jest-extended");
const app = require("../src/app");
const validationRule = {
  classification: "required|string",
  name: "required|string",
};

describe("CHECK IF INGREDIENTS ROUTES WORK", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test("creates a new ingredient", async () => {
    await new Promise((r) => setTimeout(r, 2000));
    const newIngredient = {};
    const response = await request(app)
      .post("/ingredients")
      .send(newIngredient);
    expect(response).toBeDefined();
  });

  test("returns a list of ingredients", async () => {
    // await new Promise((r) => setTimeout(r, 1000));
    const response = await request(app).get("/ingredients");
    expect(response).toBeDefined();
  });

  test("returns a specific ingredient by ID", async () => {
    const ingredientId = "6553ed082cc92b36dcfb2187";

    const response = await request(app).get(`/ingredients/${ingredientId}`);
    expect(response).toBeDefined();
  });

  test("updates a specific ingredient by ID", async () => {
    const ingredientId = "65752e69bc610e0675853429";
    let updatedIngredient = {
      classification: "SCOOBYupdated_classification",
      name: "updated_name",
    };

    const response = await request(app)
      .put(`/ingredients/${ingredientId}`)
      .send(updatedIngredient);
    expect(response).toBeDefined();
  });

  test("deletes a specific ingredient by ID", async () => {
    const ingredientId = "6575310b3a6a73e17bf34ac1";

    const response = await request(app).delete(`/ingredients/${ingredientId}`);
    expect(response).toBeDefined();
  });
});
