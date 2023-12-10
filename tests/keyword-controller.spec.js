const request = require("supertest");
const app = require("../src/app");
const validationRule = {
  classification: "required|string",
  name: "required|string",
};

describe("Crud Test for /keywords", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test("creates a new keyword", async () => {
    await new Promise((r) => setTimeout(r, 2000));
    const newKeyword = {
      classification: "example_classification",
      name: "example_name",
    };

    const response = await request(app).post("/keywords").send(newKeyword);
    expect(response.status).toBe(201); // Assuming you return 201 on successful creation
    console.log(response.body["acknowledged"]);
    console.log(newKeyword);
    expect(response.body["acknowledged"]).toBe(true);
  });
  // test("returns 400 if validation fails", async () => {
  //   await new Promise((r) => setTimeout(r, 2000));
  //   const invalidKeyword = {
  //     // Missing required fields
  //   };

  //   const response = await request(app).post("/keywords").send(invalidKeyword);

  //   expect(response.status).toBe(400); // Assuming you return 400 for validation failure
  //   expect(response.body).toHaveProperty("error");
  //   expect(response.body.error).toBeInstanceOf(Array);
  //   expect(response.body.error).toHaveLength(2); // Assuming 2 validation errors in this case
  // });
  test("returns a list of keywords", async () => {
    // await new Promise((r) => setTimeout(r, 1000));
    const response = await request(app).get("/keywords");
    expect(response.status).toBe(200);
    console.log(response.body[0]);
    console.log(typeof response.body);
    //   expect(() => JSON.parse(response.body[0])).not.toThrow();
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.length).toBeGreaterThan(0);
  });
  test("returns a specific keyword by ID", async () => {
    const keywordId = "6553ed082cc92b36dcfb2187";

    const response = await request(app).get(`/keywords/${keywordId}`);
    expect(response.status).toBe(200);
    expect(response.body[0]._id).toBe(keywordId);
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
    expect(response.status).toBe(200);
    let updateResponse = await request(app).get(`/keywords/${keywordId}`);
    console.log(updateResponse.body);
    updatedKeyword = {
      _id: keywordId,
      classification: "SCOOBYupdated_classification",
      name: "updated_name",
    };

    const receivedKeyword = Array.isArray(updateResponse.body)
      ? updateResponse.body[0]
      : updateResponse.body;
    expect(receivedKeyword).toEqual(updatedKeyword);
  });
  test("deletes a specific keyword by ID", async () => {
    const keywordId = "6575310b3a6a73e17bf34ac1";

    const response = await request(app).delete(`/keywords/${keywordId}`);
    expect(response.status).toBe(200);
    expect(response.body["acknowledged"]).toBe(true);
  });
});
