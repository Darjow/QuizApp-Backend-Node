const {tables} = require("..");
const roles = require("../../core/roles");
module.exports = {
  seed: async(knex) => {
    await knex(tables.users).insert(
      [
        {
          id: 1,
          email:"a@a.com",
          username:"Dario Admin",
          firstname:"Dario",
          lastname:"Admin",
          score: 0,
          password_hash:"$argon2id$v=19$m=4096,t=6,p=1$bAS8XykPSMVsfJEWzrVGGw$r9JRazUQztRpwkWe5NGawftOydBBnpcOqwWdgdnfAvA", //testertest
          roles: JSON.stringify([roles.ADMIN,roles.USER])
        },
        {
          id: 2,
          email:"test@h.com",
          username:"Dario User",
          firstname:"Dario",
          lastname:"User",
          score: 0,
          password_hash:"$argon2id$v=19$m=4096,t=6,p=1$bAS8XykPSMVsfJEWzrVGGw$r9JRazUQztRpwkWe5NGawftOydBBnpcOqwWdgdnfAvA", //testertest 
          roles: JSON.stringify([roles.USER])
        }
    ]
    )
  }
}