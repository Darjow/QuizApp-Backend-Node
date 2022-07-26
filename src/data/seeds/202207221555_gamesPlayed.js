const {tables} = require("..");

module.exports = {
  seed: async(knex) => {
    await knex(tables.gamesPlayed).insert(
      [
        {
          player_id: 1,
          score: -50,
          quiz_id: 1
        },
        {
          player_id: 1,
          score: 50,
          quiz_id: 2
        }
      ]
    )

  }
}
      