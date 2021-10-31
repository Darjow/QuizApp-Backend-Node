const {getKnex, tables} = require("../data");
const he = require(`he`); //DECODE HTML ENTITY -> UTF 8



const getAll = ({ limit, offset }) => {
  return getKnex()(tables.quiz) 
    .select()  
   // .where("Approved",1)  ONLY SHOW APPROVED ONES, OFF IN TESTING
    .limit(limit)
    .offset(offset)
    .orderBy('ID','asc')
    
};

const getById = (id) => {
  return getKnex()(tables.quiz)
  .select()
  .where("Approved", 1)
  .where("ID", id)
  .orderBy('ID', 'ASC')


}
const getByCategory = (category) => {
  return getKnex()(tables.quiz)
  .select()
  .where("Category", category)
  .orderBy("ID", "ASC")
}
const getByCategoryDifficulty = (category,difficulty) => {
  return getKnex()(tables.quiz)
  .select()
  .where("Category", category)
  .where("Difficulty", difficulty)
  .orderBy("ID","ASC")
}
const getByDifficulty = (difficulty) => {
  return getKnex()(tables.quiz)
  .select()
  .where("Difficulty", difficulty)
  .orderBy("ID", "ASC")
}
const createQuiz = ({... quiz}) => {
  let dec_q = he.decode(quiz.Question);
  let dec_c = he.decode(quiz.Correct_Answer);
  let dec_au = he.decode(quiz.Author);
  let dec_inc = quiz.Incorrect_Answers.map((e) => he.decode(e));

  if(quiz.Author != "System") quiz.Approved = false;

  return getKnex()(tables.quiz)
  .insert({
    Category: quiz.Category,
    Type: quiz.Type,
    Difficulty: quiz.Difficulty,
    Question: dec_q,
    Correct_Answer: dec_c,
    Approved: quiz.Approved,
    Author: dec_au,
    Incorrect_Answers: JSON.stringify(dec_inc)
  })
}
const updateQuiz = (id, {...quiz}) => {
  let dec_q = he.decode(quiz.Question);
  let dec_c = he.decode(quiz.Correct_Answer);
  let dec_au = he.decode(quiz.Author);
  let dec_inc = quiz.Incorrect_Answers.map((e) => he.decode(e));

  return getKnex()(tables.quiz)
  .where("ID", id)
  .update({
    Category: quiz.Category,
    Type: quiz.Type,
    Difficulty: quiz.Difficulty,
    Question: dec_q,
    Correct_Answer: dec_c,
    Approved: quiz.Approved,
    Author: dec_au,
    Incorrect_Answers: JSON.stringify(dec_inc)
  })
}
const deleteQuiz = (id) => {
  return getKnex()(tables.quiz)
  .where("ID", id)
  .del()
}

module.exports = {
getAll,
getByCategory,
getById,
getByCategoryDifficulty,
getByDifficulty,
createQuiz,
updateQuiz,
deleteQuiz,


};