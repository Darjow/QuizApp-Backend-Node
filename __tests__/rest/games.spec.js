const { withServer, loginUser} = require("../supertest.setup");


describe("/games", () => {
  let request;
  let knex;
  let loginHeader

  withServer(({request: r, knex: k}) => {
    request = r;
    knex = k;
  })

  beforeAll(async () => {
    loginHeader = await loginUser(request);
  });


  
  const url = "/api/games";

  describe("GET /games", () => {
    it("should return all games", async () => {
      const response = await request.get(url).set("Authorization", loginHeader);
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(3);
    })
  })

  describe("POST /games", () => {
    
    const inc_input = {
      playerID: -1,
      quizID: 15,
      score: 50
    }
    const corr_input = {
      playerID: 1,
      quizID: 15,
      score: 50
    }
    describe("with invalid input", () => {

      it("should return 400", async () => {
        const response = await request.post(url).set("Authorization", loginHeader).send(inc_input)

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("VALIDATION_FAILED");
  
      })
    })
    describe("with correct input", () => {
      it("should succesfully create the game", async () => {
        const response = await request.post(url).set("Authorization", loginHeader).send(corr_input);


        expect(response.statusCode).toBe(201);


      })
    })
  })
})
