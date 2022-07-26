const {
  tables
} = require("..");
const {
  Categories
} = require("../../core/Enum");

module.exports = {
  seed: async (knex) => {
    await knex(tables.categories).insert([{
      id: 1,
      name: Categories[1]
    }, {
      id: 2,
      name: Categories[2]
    }, {
      id: 3,
      name: Categories[3]
    }, {
      id: 4,
      name: Categories[4]
    }, {
      id: 5,
      name: Categories[5]
    }, {
      id: 6,
      name: Categories[6]
    }, {
      id: 7,
      name: Categories[7]
    }, {
      id: 8,
      name: Categories[8]
    }, {
      id: 9,
      name: Categories[9]
    }, {
      id: 10,
      name: Categories[10]
    }, {
      id: 11,
      name: Categories[11]
    }, {
      id: 12,
      name: Categories[12]
    }, {
      id: 13,
      name: Categories[13]
    }])
  }
}