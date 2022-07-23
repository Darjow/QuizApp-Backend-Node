const {tables} = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.quiz, (table) => {
      table.integer('id').primary();
      table.string("category",50).notNullable();
      table.string("type",20).notNullable();
      table.string("difficulty",20).notNullable();
      table.string("question",200).notNullable();
      table.string("correct_answer",50).notNullable();
      table.boolean("approved");
      table.string("author",25);
      table.json("incorrect_answers").notNullable();

    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.quiz);
  }
}