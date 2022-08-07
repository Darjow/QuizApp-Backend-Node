const { withServer, loginUser, loginAdmin} = require("../supertest.setup");
const {Categories, Difficulties} = require("../../src/core/enum")
const he = require("he");


describe("Quizes User", () => {
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


  
  const url = "/api/quiz";

  describe("GET /api/quiz", () => {

    it("Should 200 and return all approved quizes.", async () => {
      const response = await request.get(url).set("Authorization", loginHeader)
      expect(response.status).toBe(200)
      expect(response.body.data.length).toBe(5)
    })
  })

  describe("GET /api/quiz/category/difficulty", () => {
  
        
    describe("with only category and any difficulty", () => {
      it("should return 2 quizes matching the category", async () => {
        const response = await request.get(`${url}/Geography/*`).set("Authorization", loginHeader);
        expect(response.statusCode).toBe(200)
        expect(response.body.data).toStrictEqual([{
            id:15,
            category: Categories["7"],        
            difficulty: Difficulties["2"],
            question: "What is the capital of Belgium?",
            correct_answer:'Brussels',
            approved:1,
            author:'Dario Admin',
            incorrect_answers: ["Antwerp", "Amsterdam"].map(e => he.encode(e))
        },{
          id:16,
          category: Categories["7"],        
          difficulty: Difficulties["1"],
          question: "What is the capital of France?",
          correct_answer:'Paris',
          approved:1,
          author:'Dario Admin',
          incorrect_answers:["Francois", "Francoise"].map(e => he.encode(e))
        }])
      })
    });
    describe("with any category and specified difficulty", () => {
      it("should return quizes with the difficulty", async () => {
        const response = await request.get(`${url}/*/easy`).set("Authorization", loginHeader);
        
        expect(response.body.data.length).toBe(2)
        expect(response.body.data[0].difficulty).toBe("easy")
        expect(response.body.data[1].difficulty).toBe("easy")

        expect(response.statusCode).toBe(200)
      })
    })

    describe("with any category and any difficulty", () => {
      it("should return all approved quizes", async () => {
          const response = await request.get(`${url}/*/*`).set("Authorization", loginHeader);

          expect(response.body.length).toBe(5)
          expect(response.statusCode).toBe(200)
      })
    })
  })


  describe("POST /api/quiz", () => {
    it("should create a new quize", async () => {
      let quiz = {
        category: Categories["5"],        
        difficulty: Difficulties["2"],
        question: "Do you think this is a random question?",
        correct_answer:'Yes',
        author:'Dario Admin',
        incorrect_answers: ["no"],
    }

      const response = await request.post(`${url}`).set("Authorization", loginHeader).send(quiz);
      quiz.approved = 0;
      quiz.id = 20;

      expect(response.statusCode).toBe(201)
      expect(response.body).toStrictEqual([quiz])
      expect(response.body).toHaveLength(1);


    })
  })
})



describe("Quizes Admin", () => {
  let request;
  let knex;
  let loginHeader;

  withServer(({request: r, knex: k}) => {
    request = r;
    knex = k;
  })

  beforeAll(async () => {
    loginHeader = await loginAdmin(request);
  });

  const url = "/api/quiz/admin";

  describe("GET /api/quiz/admin", () => {
    it("should return 3 quizes", async () => {
      const response = await request.get(url).set("Authorization", loginHeader);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(4); //3 inserted + 1 created earlier in test
    })
  })
})