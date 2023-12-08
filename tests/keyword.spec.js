const request = require("supertest");
const app = require("../src/app");

// test("getKeywords returns an array of keywords", async() => {
//     // Assuming getKeywords function connects to a real MongoDB
//     const result = await getKeywords();

//     // Perform assertions based on the expected behavior of getKeywords
// expect(Array.isArray(result)).toBe(true);
//     // Add more specific assertions based on the actual behavior of your function
// expect(result).toBeGreaterThan(0);
// });

test("returns a list of keywords", async() => {
    await new Promise((r) => setTimeout(r, 2000));
    const response = await request(app).get("/keywords");
    expect(response.status).toBe(200);
    expect(response).toBe(true);
    expect(result).toBeGreaterThan(0);
});