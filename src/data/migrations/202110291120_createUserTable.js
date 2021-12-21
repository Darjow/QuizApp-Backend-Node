const {tables} = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.users, (table) => {
      table.increments('ID');
      table.unique("email", "idx_user_email_unique");
      table.string("username",20).notNullable().unique();
      table.string("first_Name",20).notNullable();
      table.string("last_Name",20).notNullable();
      table.string("password_hash").notNullable();
      table.json("roles").notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.users);
  }
}