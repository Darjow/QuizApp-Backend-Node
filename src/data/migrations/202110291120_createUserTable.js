const {tables} = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.users, (table) => {
      table.increments('ID');
      table.string("Email",50).notNullable();
      table.string("Username",20).notNullable().unique();
      table.string("First_Name",20).notNullable();
      table.string("Last_Name",20).notNullable();
      table.string("Password",20).notNullable();
      table.boolean("Admin").defaultTo(false);
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.users);
  }
}