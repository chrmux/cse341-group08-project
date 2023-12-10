const request = require("supertest");
const app = require("../src/app");
const validationRule = {
  name: "required|string",
  description: "required|string",
  category: "required|string",
};

describe("Tests for CRUD /ingredients", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test("creates a new ingredients", async () => {
    await new Promise((r) => setTimeout(r, 2000));
    const newIngredients = {
      name: "Sample Name",
      description: "Sample Ingredient Description",
      category: "Fish",
    };

    const response = await request(app)
      .post("/ingredients")
      .send(newIngredients);
    expect(response.status).toBe(201); // Assuming you return 201 on successful creation
    console.log(response.body["acknowledged"]);
    console.log(newIngredients);
    expect(response.body["acknowledged"]).toBe(true);
  });
  // test("returns 400 if validation fails", async () => {
  //   await new Promise((r) => setTimeout(r, 2000));
  //   const invalidIngredients = {
  //     // Missing required fields
  //   };

  //   const response = await request(app).post("/ingredients").send(invalidIngredients);

  //   expect(response.status).toBe(400); // Assuming you return 400 for validation failure
  //   expect(response.body).toHaveProperty("error");
  //   expect(response.body.error).toBeInstanceOf(Array);
  //   expect(response.body.error).toHaveLength(2); // Assuming 2 validation errors in this case
  // });
  test("returns a list of ingredients", async () => {
    await new Promise((r) => setTimeout(r, 2000));
    const response = await request(app).get("/ingredients");
    expect(response.status).toBe(200);
    console.log(response.body[0]);
    console.log(typeof response.body);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.length).toBeGreaterThan(0);
  });
  test("returns a specific ingredient by ID", async () => {
    const ingredientId = "6553e7b42cc92b36dcf35b9e";

    const response = await request(app).get(`/ingredients/${ingredientId}`);
    expect(response.status).toBe(200);
    expect(response.body[0]._id).toBe(ingredientId);
  });
  test("updates a specific ingredient by ID", async () => {
    const ingredientId = "65752d5172c6ecd877b89d4b";
    let updatedIngredient = {
      name: "Scooby DOO",
      description: "Sample Ingredient Description",
      category: "Fish",
    };

    const response = await request(app)
      .put(`/ingredients/${ingredientId}`)
      .send(updatedIngredient);
    expect(response.status).toBe(200);
    let updateResponse = await request(app).get(`/ingredients/${ingredientId}`);
    console.log(updateResponse.body);
    updatedIngredient = {
      _id: ingredientId,
      name: "Scooby DOO",
      description: "Sample Ingredient Description",
      category: "Fish",
    };

    const receivedIngredient = Array.isArray(updateResponse.body)
      ? updateResponse.body[0]
      : updateResponse.body;
    expect(receivedIngredient).toEqual(updatedIngredient);
  });
  test("deletes a specific keyword by ID", async () => {
    const ingredientsId = "657530c6ab5dd6d3bc84f8d1";

    const response = await request(app).delete(`/ingredients/${ingredientsId}`);
    expect(response.status).toBe(200);
    expect(response.body["acknowledged"]).toBe(true);
  });
});
