const {getKnex, tables} = require("../data");
const ServiceError = require("../core/serviceError");
const he = require("he")



const getHighestID = () => {
  return getKnex()(tables.quiz)
    .select("id")
    .orderBy("id", "desc")
    .limit(1)

}


const getAll = () => {
  return getKnex()(tables.quiz) 
    .select()
    .where("approved", 1)  
    .orderBy('id','asc')
    
};

const getById = (id) => {
  return getKnex()(tables.quiz)
  .select()
  .where("id", id)
}
const getByCategory = (category) => {
  return getKnex()(tables.quiz)
  .select()
  .where("category", category)
  .where("approved", 1)
  .orderBy("id", "ASC")
}
const getByCategoryDifficulty = (category,difficulty) => {
  return getKnex()(tables.quiz)
  .select()
  .where("category", category)
  .where("difficulty", difficulty)
  .where("approved", 1)
  .orderBy("id","ASC")
}
const getByDifficulty = (difficulty) => {
  return getKnex()(tables.quiz)
  .select()
  .where("difficulty", difficulty)
  .where("approved", 1)
  .orderBy("id", "ASC")
}
const createQuiz = (id, {... quiz}) => {
  let dec_q = he.decode(quiz.question);
  let dec_c = typeof(quiz.correct_answer) === "number"? quiz.correct_answer : he.decode(quiz.correct_answer);
  let dec_au = he.decode(quiz.author);
  let dec_inc = quiz.incorrect_answers.map((e) => he.decode(e));

  return getKnex()(tables.quiz)
  .insert({
    id: id,
    category: quiz.category,
    difficulty: quiz.difficulty,
    question: dec_q,
    correct_answer: dec_c,
    approved: 0,
    author: dec_au,
    incorrect_answers: JSON.stringify(dec_inc)
  })
}


const deleteQuiz = (id) => {
  return getKnex()(tables.quiz)
  .where("id", id)
  .del()
}

const getAllNotApproved = () => {
  return getKnex()(tables.quiz)
    .select()
    .where("approved", 0)
}

const approveQuiz = (id)  => {
  return getKnex()(tables.quiz)
  .update({approved: 1})
  .where("id", id)
}

module.exports = {
getAll,
getByCategory,
getById,
getByCategoryDifficulty,
getByDifficulty,
createQuiz,
deleteQuiz,
getAllNotApproved,
approveQuiz,

getHighestID


};