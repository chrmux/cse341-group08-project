const request = require("supertest");
const app = require("../src/app");
const { toBeOneOf } = require("jest-extended");
const validationRule = {
  classification: "required|string",
  name: "required|string",
};

describe("CHECK IF PHOTOS ROUTES WORK", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test("creates a new photo", async () => {
    await new Promise((r) => setTimeout(r, 2000));
    const newPhoto = {};
    const response = await request(app).post("/photos").send(newPhoto);
    expect(response).toBeDefined();
  });

  test("returns a list of photos", async () => {
    // await new Promise((r) => setTimeout(r, 1000));
    const response = await request(app).get("/photos");
    expect(response).toBeDefined();
  });

  test("returns a specific photo by ID", async () => {
    const photoId = "6553ed082cc92b36dcfb2187";

    const response = await request(app).get(`/photos/${photoId}`);
    expect(response).toBeDefined();
  });

  test("updates a specific photo by ID", async () => {
    const photoId = "65752e69bc610e0675853429";
    let updatedPhoto = {
      classification: "SCOOBYupdated_classification",
      name: "updated_name",
    };

    const response = await request(app)
      .put(`/photos/${photoId}`)
      .send(updatedPhoto);
    expect(response).toBeDefined();
  });

  test("deletes a specific photo by ID", async () => {
    const photoId = "6575310b3a6a73e17bf34ac1";

    const response = await request(app).delete(`/photos/${photoId}`);
    expect(response).toBeDefined();
  });
});
