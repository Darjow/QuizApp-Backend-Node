const supertest = require("supertest");
const createServer = require("../src/createServer");
const { getKnex } = require("../src/data");


module.exports.withServer = (setter) => {
  let server; 

  beforeAll(async () => {
    server = await createServer();
    setter({
      knex: getKnex(),
      request: supertest(server.getApp().callback())
    });
  });

  afterAll(async () => {
    await server.stop();
  });

}

module.exports.loginAdmin = async (supertest) => {
  const response = await supertest.post("/api/users/login")
  .send({
    username: "Dario Admin",
    password: "testertest"
  });

  if(response.statusCode !== 200){
    throw new Error(response.body.message ||"Unknown error happened.")
  }

  return `Bearer ${response.body.token}`;
}

module.exports.loginUser = async (supertest) => {
  const response = await supertest.post("/api/users/login")
  .send({
    username: "Dario User",
    password: "testertest"
  });

  if(response.statusCode !== 200){
    throw new Error(response.body.message ||"Unknown error happened.")
  }

  return `Bearer ${response.body.token}`;
}