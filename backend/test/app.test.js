// https://www.npmjs.com/package/supertest
// https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6
const { itemsPath, app } = require("../app");
const request = require("supertest");
// const assert = require("assert");

// const id = {id:"62fd806481fa3faa9570282e"}; 
const testItem = {
  type: "trousers",
  model: "2AVAG1E",
  color: "white",
  price: 129.99,
  count: 150,
};

describe("test /items path", () => {
  test("GET METHOD", async () => {
    const res = await request(app)
      .get(itemsPath)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
  });

  test("BAD REQUEST", async () => {
    const res = await request(app)
      .get("/badurl")
      .set("Accept", "application/json");
    expect(res.statusCode).toBe(404);
  });

  test("POST METHOD, DELETE METHOD", async () => {
    const resPOST = await request(app).post(itemsPath).send(testItem);
    expect(resPOST._body).toEqual({
      item: {
        ...testItem,
      },
    });
    
    const resDELETE = await request(app).delete(itemsPath).send(testItem);
    expect(resDELETE._body).toEqual({ result: true });
    console.log(resPOST._body);
  });

  test("PUT METHOD", async () => {
    const restCount = await request(app)
      .put(itemsPath)
      .send({ ...testItem, count: 900 });
    expect(restCount._body).toEqual({ result: true });
    const restDefaultCount = await request(app).put(itemsPath).send(testItem);
    expect(restDefaultCount._body).toEqual({ result: true });
  });

});
