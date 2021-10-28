const {tables} = require("..");

module.exports = {
  seed: async(knex) => {
    await knex(tables.quiz).delete();
    await knex(tables.quiz).insert([
        {
          Category:'Entertainment: Video Games',
          Type:'Multiple',
          Difficulty: 'Hard',
          Question: "Who with having created the world's first video game Easter Egg?",
          Correct_Answer:'Warren Robinett',
          Approved:0,
          Author:'Dario Bronders',
          Incorrect_answers:JSON.stringify(["bla", "bla", "bla"]),
        },{
          Category:'Entertainment: Movies',
          Type:'Multiple',
          Difficulty: 'Medium',
          Question: "What's the most famous movie?",
          Correct_Answer:'Star Wars',
          Approved:0,
          Author:'Dario Bronders',
          Incorrect_answers:JSON.stringify(["bla", "bla", "bla"]),
        }
      ]);
  }
}