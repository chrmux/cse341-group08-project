const request = require("supertest");
const app = require("../src/app");

const recipeValidationRule = {
  _id: "string",
  photo: "string",
  title: "string",
  ingredients: [
    {
      id: "string",
      name: "string",
      quantity: "string",
    },
  ],
  instructions: ["string"],
  creator: "string",
  keywords: ["string"],
  Culture: "string",
  level: "string",
  description: "string",
};

describe("Recipes CRUD interactions", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test("creates a new recipe", async () => {
    await new Promise((r) => setTimeout(r, 2000));
    const newRecipe = {
      photo: "string",
      title: "string",
      ingredients: "string",
      instruction: "string",
      creator: "string",
      keywords: "string",
      level: "string",
      description: "string",
    };

    const response = await request(app).post("/recipes").send(newRecipe);
    expect(response.status).toBe(201); // Assuming you return 201 on successful creation
    console.log(response.body["acknowledged"]);
    console.log(newRecipe);
    expect(response.body["acknowledged"]).toBe(true);
  });
  // test("returns 400 if validation fails", async () => {
  //   await new Promise((r) => setTimeout(r, 2000));
  //   const invalidRecipe = {
  //     // Missing required fields
  //   };

  //   const response = await request(app).post("/recipes").send(invalidRecipe);

  //   expect(response.status).toBe(400); // Assuming you return 400 for validation failure
  //   expect(response.body).toHaveProperty("error");
  //   expect(response.body.error).toBeInstanceOf(Array);
  //   expect(response.body.error).toHaveLength(2); // Assuming 2 validation errors in this case
  // });
  test("returns a list of recipes", async () => {
    await new Promise((r) => setTimeout(r, 2000));
    const response = await request(app).get("/recipes");
    expect(response.status).toBe(200);
    console.log(response.body[0]);
    console.log(typeof response.body);
    //   expect(() => JSON.parse(response.body[0])).not.toThrow();
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.length).toBeGreaterThan(0);
  });
  test("returns a specific recipe by ID", async () => {
    const recipeId = "6553f1c52cc92b36dc024aff";

    const response = await request(app).get(`/recipes/${recipeId}`);
    expect(response.status).toBe(200);
    expect(response.body[0]._id).toBe(recipeId);
  });
  test("updates a specific recipe by ID", async () => {
    const recipeId = "65752de4f742c722b6ec4342";
    let updatedRecipe = {
      photo: "hey stephen",
      title: "say to you",
      ingredients: "string",
      instruction: "string",
      creator: "string",
      keywords: "string",
      level: "string",
      description: "string",
    };

    const response = await request(app)
      .put(`/recipes/${recipeId}`)
      .send(updatedRecipe);

    expect(response.status).toBe(200);
    let updateResponse = await request(app).get(`/recipes/${recipeId}`);
    console.log(updateResponse.body);
    updatedRecipe = {
      _id: recipeId,
      photo: "hey stephen",
      title: "say to you",
      ingredients: "string",
      instruction: "string",
      creator: "string",
      keywords: "string",
      level: "string",
      description: "string",
    };

    const receivedRecipe = Array.isArray(updateResponse.body)
      ? updateResponse.body[0]
      : updateResponse.body;
    expect(receivedRecipe).toEqual(updatedRecipe);
  });
  test("deletes a specific recipe by ID", async () => {
    const recipeId = "657530cdd71e5677a35146aa";

    const response = await request(app).delete(`/recipes/${recipeId}`);
    expect(response.status).toBe(200);
    expect(response.body["acknowledged"]).toBe(true);
  });
});
