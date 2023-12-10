const request = require("supertest");
const app = require("../src/app");
const validationRule = {
  _id: "6560500fb3563ef08bd74875",
  tenant: "dev-0glbmgcmozyj8djv",
  connection: "cse341-teamfinal",
  email: "philknight@gmail.com",
  password: "$2b$10$bqY56ixUX2/WqJonL70ja.WdhT5ovmTGIfySMKvFL5mTNAQ0fasNC",
  debug: true,
  is_signup: true,
  usePasskey: false,
};

describe("user CRUD interactions", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test("creates a new user", async () => {
    await new Promise((r) => setTimeout(r, 2000));
    const newUser = {
      tenant: "dev-0glbmgcmozyj8djv",
      connection: "cse341-teamfinal",
      email: "philknight@gmail.com",
      password: "$2b$10$bqY56ixUX2/WqJonL70ja.WdhT5ovmTGIfySMKvFL5mTNAQ0fasNC",
      debug: true,
      is_signup: true,
      usePasskey: false,
    };

    const response = await request(app).post("/user").send(newUser);
    expect(response.status).toBe(201); // Assuming you return 201 on successful creation
    console.log(response.body["acknowledged"]);
    console.log(newUser);
    expect(response.body["acknowledged"]).toBe(true);
  });
  // test("returns 400 if validation fails", async () => {
  //   await new Promise((r) => setTimeout(r, 2000));
  //   const invalidUser = {
  //     // Missing required fields
  //   };

  //   const response = await request(app).post("/users").send(invalidUser);

  //   expect(response.status).toBe(400); // Assuming you return 400 for validation failure
  //   expect(response.body).toHaveProperty("error");
  //   expect(response.body.error).toBeInstanceOf(Array);
  //   expect(response.body.error).toHaveLength(2); // Assuming 2 validation errors in this case
  // });
  test("returns a list of users", async () => {
    await new Promise((r) => setTimeout(r, 2000));
    const response = await request(app).get("/user");
    expect(response.status).toBe(200);
    console.log(response.body[0]);
    console.log(typeof response.body);
    //   expect(() => JSON.parse(response.body[0])).not.toThrow();
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.length).toBeGreaterThan(0);
  });
  test("returns a specific user by ID", async () => {
    const userId = "6560500fb3563ef08bd74875";

    const response = await request(app).get(`/user/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body[0]._id).toBe(userId);
  });
  test("updates a specific user by ID", async () => {
    const userId = "6560500fb3563ef08bd74875";
    let updatedUser = {
      tenant: "dev-0glbmgcmozyj8djv",
      connection: "cse341-teamfinal",
      email: "philknight@gmail.com",
      password: "$2b$10$bqY56ixUX2/WqJonL70ja.WdhT5ovmTGIfySMKvFL5mTNAQ0fasNC",
      debug: true,
      is_signup: true,
      usePasskey: false,
    };

    const response = await request(app)
      .put(`/user/${userId}`)
      .send(updatedUser);
    console.log(response.body);
    expect(response.status).toBe(200);
    const updateCheck = await request(app).get(`/user/${userId}`);
    expect(response.body).toMatchObject(updatedUser);
  });
  // test("deletes a specific user by ID", async () => {
  //   const userId = "65753019d5b1369be0b1cb4c";

  //   const response = await request(app).delete(`/user/${userId}`);
  //   expect(response.status).toBe(200);
  //   expect(response.body["acknowledged"]).toBe(true);
  // });
});
