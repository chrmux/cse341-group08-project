const request = require("supertest");
const app = require("../src/app");
const validationRule = {
  title: "Sample Photo Name",
  url: "sample photo url",
};

describe("POST /photos", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test("creates a new photo", async () => {
    await new Promise((r) => setTimeout(r, 2000));
    const newPhoto = {
      title: "example_classification",
      url: "example_name",
    };

    const response = await request(app).post("/photos").send(newPhoto);
    expect(response.status).toBe(201); // Assuming you return 201 on successful creation
    console.log(response.body["acknowledged"]);
    console.log(newPhoto);
    expect(response.body["acknowledged"]).toBe(true);
  });
  // test("returns 400 if validation fails", async () => {
  //   await new Promise((r) => setTimeout(r, 2000));
  //   const invalidPhoto = {
  //     // Missing required fields
  //   };

  //   const response = await request(app).post("/photos").send(invalidPhoto);

  //   expect(response.status).toBe(400); // Assuming you return 400 for validation failure
  //   expect(response.body).toHaveProperty("error");
  //   expect(response.body.error).toBeInstanceOf(Array);
  //   expect(response.body.error).toHaveLength(2); // Assuming 2 validation errors in this case
  // });
  test("returns a list of photos", async () => {
    await new Promise((r) => setTimeout(r, 2000));
    const response = await request(app).get("/photos");
    expect(response.status).toBe(200);
    console.log(response.body[0]);
    console.log(typeof response.body);
    //   expect(() => JSON.parse(response.body[0])).not.toThrow();
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.length).toBeGreaterThan(0);
  });
  test("returns a specific photo by ID", async () => {
    const photoId = "6570d3a70b041abbed2ab414";

    const response = await request(app).get(`/photos/${photoId}`);
    expect(response.status).toBe(200);
    expect(response.body[0]._id).toBe(photoId);
  });
  test("updates a specific photo by ID", async () => {
    const photoId = "65752bc43d7976dbcc5f2bca";
    let updatedPhoto = {
      title: "SCOOBYtougher than the rest",
      url: "new jersey",
    };

    const response = await request(app)
      .put(`/photos/${photoId}`)
      .send(updatedPhoto);
    expect(response.status).toBe(200);
    let updateResponse = await request(app).get(`/photos/${photoId}`);

    updatedPhoto = {
      _id: photoId,
      title: "SCOOBYtougher than the rest",
      url: "new jersey",
    };
    const receivedPhoto = Array.isArray(updateResponse.body)
      ? updateResponse.body[0]
      : updateResponse.body;
    expect(receivedPhoto).toEqual(updatedPhoto);
  });
  test("deletes a specific photo by ID", async () => {
    const photoId = "65753101618e88d90c7f2c52";

    const response = await request(app).delete(`/photos/${photoId}`);
    expect(response.status).toBe(200);
    expect(response.body["acknowledged"]).toBe(true);
  });
});
