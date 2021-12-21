const {tables} = require("..");
const roles = require("../../core/roles");
module.exports = {
  seed: async(knex) => {
    await knex(tables.users).delete();
    await knex(tables.users).insert(
      [
        {
          email:"test@hotmail.com",
          username:"test",
          firstname:"tester",
          lastname:"testerG",
          password_hash:"$argon2id$v=19$m=4096,t=6,p=1$O7ItL2kvVAfkyuPxWSvzpg$zGHFpEgz+7/H2ycGzWLbChqqyqLPZQJdMsVCxgmdXmk",
          roles: JSON.stringify([roles.ADMIN,roles.USER])
        }
      ]);
  }
}