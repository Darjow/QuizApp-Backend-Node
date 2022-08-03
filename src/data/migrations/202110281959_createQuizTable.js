const {tables} = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.quiz, (table) => {
      table.integer('id').primary();
      table.integer("category_id",2).notNullable();
      table.integer("difficulty_id",1).notNullable();
      table.string("question",150).notNullable();
      table.string("correct_answer",50).notNullable();
      table.boolean("approved");
      table.string("author",25);
      table.json("incorrect_answers").notNullable();


      table.foreign("category_id", "fk_categoryID")
      .references(`${tables.categories}.id`)
      .onDelete("NO ACTION")
      .onUpdate("NO ACTION")

      table.foreign("difficulty_id", "fk_difficultyID")
      .references(`${tables.difficulties}.id`)
      .onDelete("NO ACTION")
      .onUpdate("NO ACTION")
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.quiz);
  }
}