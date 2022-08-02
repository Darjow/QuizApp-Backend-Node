const {tables} = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.gamesPlayed, (table) => {
      table.increments("id");
      table.integer("player_id").notNullable();
      table.integer("quiz_id").nullable()
      table.integer("score").notNullable();

      table.foreign("player_id", "fk_gamesPlayed_playerID")
        .references(`${tables.users}.id`)
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
  


    table.foreign("quiz_id", "fk_gamesPlayed_quizID")
      .references(`${tables.quiz}.id`)
      .onDelete("SET NULL")
    
    })

  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.gamesPlayed);
  }

}