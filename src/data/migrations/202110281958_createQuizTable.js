const {tables} = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.quiz, (table) => {
      table.increments('ID');
      table.string("Category",50).notNullable();
      table.string("Type",20).notNullable();
      table.string("Difficulty",20).notNullable();
      table.string("Question",200).notNullable();
      table.string("Correct_Answer",50).notNullable();
      table.boolean("Approved");
      table.string("Author",25);
      table.json("Incorrect_answers").notNullable();

    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.quiz);
  }
}