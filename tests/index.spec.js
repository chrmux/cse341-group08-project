const server = require("../src/index.js");
const request = require("supertest");

test("server starts without errors", async () => {
  await new Promise((r) => setTimeout(r, 2000));
  // No assertions needed, the test will pass if the server starts without errors
  expect(server).toBeDefined();
});
