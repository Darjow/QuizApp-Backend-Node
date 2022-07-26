const {tables} = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.categories, (table) => {
      table.integer('id').primary();
      table.string("name",50).notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.categories);
  }
}