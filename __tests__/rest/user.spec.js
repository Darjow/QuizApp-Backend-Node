const { withServer, loginAdmin} = require("../supertest.setup");


describe("/users", () => {
  let request;
  let knex;
  let loginHeader

  withServer(({request: r, knex: k}) => {
    request = r;
    knex = k;
  })

  beforeAll(async () => {
    loginHeader = await loginAdmin(request);
  });

  const url = "/api/users"

  describe("GET /id", () => {
    describe("with existing id", () => {
      it("should return data", async () => {
        const response = await request.get(`${url}/1`).set("Authorization", loginHeader);

        expect(response.statusCode).toBe(200);
        expect(response.body.user).toHaveProperty("id", 1)
      })
    })
    describe("with someone else his id", () => {
      it("should return 401, unauthorized", async ()  => {
        const response = await request.get(`${url}/2`).set("Authorization", loginHeader);

        expect(response.statusCode).toBe(401)
        expect(response.body.code).toBe("UNAUTHORIZED")
      })
    })
  })

  describe("POST /id/score", () => {
    describe("with invalid score", () => {
      it("should return 400", async () => {
        const response = await request.post(`${url}/1/score`).set("Authorization", loginHeader).send({score:-250});
        
        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("VALIDATION_FAILED");

      })
    })
  })

});
