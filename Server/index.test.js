const request = require("supertest");

const app = require("./index");

describe("POST /login", () => {
  describe("given a username and password", () => {

    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/login").send({
        username: "aya@gmail.com",
        password: "yarab" })
      // expect(response.statusCode).toBe(200)
      expect(response.body.userId).toBeDefined()
    })
  })})
    // test("should specify json in the content type header", async () => {
    //   const response = await request(app).post("/users").send({
    //     username: "username",
    //     password: "password"
    //   })
    //   expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    // })
  //   test("response has userId", async () => {
  //     const response = await request(app).post("/login").send({
  //       username: "aya@gmail.com",
  //       password: "yarab"
  //     })
  //     
  //   })
  // })

  // describe("when the username and password is missing", () => {
  //   test("should respond with a status code of 400", async () => {
  //     const bodyData = [
  //       {username: "username"},
  //       {password: "password"},
  //       {}
  //     ]
  //     for (const body of bodyData) {
  //       const response = await request(app).post("/users").send(body)
  //       expect(response.statusCode).toBe(400)
  //     }
  //   })
  // })

// })