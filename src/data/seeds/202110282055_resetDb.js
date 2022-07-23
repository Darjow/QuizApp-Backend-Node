const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.gamesPlayed).delete();
    await knex(tables.quiz).delete();
    await knex(tables.users).delete();
  },
};