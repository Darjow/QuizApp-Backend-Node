const {
  tables
} = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.difficulties).insert([{
      id: 1,
      name: "easy"
    }, {
      id: 2,
      name: "medium"
    }, {
      id: 3,
      name: "hard"
    }
  ])

}
}