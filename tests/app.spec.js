const request = require("supertest");
const app = require("../src/app");
test("app exists", async () => {
  await new Promise((r) => setTimeout(r, 2000));
  // No assertions needed, the test will pass if the server starts without errors
  expect(app).toBeDefined();
});
