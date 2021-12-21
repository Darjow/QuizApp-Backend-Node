const {tables} = require("..");

module.exports = {
  seed: async(knex) => {
    await knex(tables.quiz).delete();
    await knex(tables.quiz).insert([
        {
          category:'Entertainment: Video Games',
          type:'Multiple',
          difficulty: 'Hard',
          question: "Who with having created the world's first video game Easter Egg?",
          correct_Answer:'Warren Robinett',
          approved:0,
          author:'Dario Bronders',
          incorrect_answers:JSON.stringify(["bla", "bla", "bla"]),
        },{
          category:'Entertainment: Movies',
          type:'Multiple',
          difficulty: 'Medium',
          question: "What's the most famous movie?",
          correct_Answer:'Star Wars',
          approved:0,
          author:'Dario Bronders',
          incorrect_answers:JSON.stringify(["bla", "bla", "bla"]),
        }
      ]);
  }
}