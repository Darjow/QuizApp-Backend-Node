const {tables} = require("..");

module.exports = {
  seed: async(knex) => {
    await knex(tables.users).delete();
    await knex(tables.users).insert([
        {
          Email:"dariobronders123@hotmail.com",
          Username:"dario bronders",
          First_Name:"dario",
          Last_Name:"bronders",
          Password:"test",
          Admin: true
        },
        {
        Email:"jupa@live.be",
        Username:"jupa",
        First_Name:"jurg",
        Last_Name:"patri",
        Password:"test",
        Admin:false
        }
      ]);
  }
}