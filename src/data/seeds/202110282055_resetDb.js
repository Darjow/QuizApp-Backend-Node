const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.quiz).delete();
  },
};