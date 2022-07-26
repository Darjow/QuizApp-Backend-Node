const {tables} = require("..");

module.exports = {
  seed: async(knex) => {
    await knex(tables.quiz).insert([
        {
          id: 1,
          category_id:1,
          type:'Multiple',
          difficulty_id: 1,
          question: "Who with having created the world's first video game Easter Egg?",
          correct_answer:'Warren Robinett',
          approved:0,
          author:'Dario Bronders',
          incorrect_answers:JSON.stringify(["bla", "bla", "bla"]),
        },{
          id: 2,
          category_id:2,
          type:'Multiple',
          difficulty_id:2,
          question: "What's the most famous movie?",
          correct_answer:'Star Wars',
          approved:0,
          author:'Dario Bronders',
          incorrect_answers:JSON.stringify(["bla", "bla", "bla"]),
        }
      ]);
  }
}