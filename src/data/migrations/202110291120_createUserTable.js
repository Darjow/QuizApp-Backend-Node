const {tables} = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.users, (table) => {
      table.integer('id').primary();
      table.string("email", 30).notNullable().unique();
      table.string("username",20).notNullable().unique();
      table.string("firstname",20).notNullable();
      table.string("lastname",20).notNullable();
      table.string("password_hash").notNullable();
      table.json("roles").notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.users);
  }
}