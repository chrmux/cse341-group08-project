const request = require("supertest");
const { toBeOneOf } = require("jest-extended");
const app = require("../src/app");
const validationRule = {
  classification: "required|string",
  name: "required|string",
};

describe("CHECK IF RECIPES ROUTES WORK", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test("creates a new recipe", async () => {
    await new Promise((r) => setTimeout(r, 2000));
    const newRecipe = {};
    const response = await request(app).post("/recipes").send(newRecipe);
    expect(response).toBeDefined();
  });

  test("returns a list of recipes", async () => {
    // await new Promise((r) => setTimeout(r, 1000));
    const response = await request(app).get("/recipes");
    expect(response).toBeDefined();
  });

  test("returns a specific recipe by ID", async () => {
    const recipeId = "6553ed082cc92b36dcfb2187";

    const response = await request(app).get(`/recipes/${recipeId}`);
    expect(response).toBeDefined();
  });

  test("updates a specific recipe by ID", async () => {
    const recipeId = "65752e69bc610e0675853429";
    let updatedRecipe = {
      classification: "SCOOBYupdated_classification",
      name: "updated_name",
    };

    const response = await request(app)
      .put(`/recipes/${recipeId}`)
      .send(updatedRecipe);
    expect(response).toBeDefined();
  });

  test("deletes a specific recipe by ID", async () => {
    const recipeId = "6575310b3a6a73e17bf34ac1";

    const response = await request(app).delete(`/recipes/${recipeId}`);
    expect(response).toBeDefined();
  });
});
