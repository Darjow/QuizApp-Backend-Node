const {getKnex, tables} = require("../data");
const he = require(`he`); //DECODE HTML ENTITY -> UTF 8
const ServiceError = require("../core/serviceError");




const getAmount = () => {
  return getKnex()(tables.quiz)
    .select()
    .count()
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
  .where("approved", 1)
  .where("id", id)


}
const getByCategory = (category) => {
  return getKnex()(tables.quiz)
  .select()
  .where("category_id", category)
  .where("approved", 1)
  .orderBy("id", "ASC")
}
const getByCategoryDifficulty = (category,difficulty) => {
  return getKnex()(tables.quiz)
  .select()
  .where("category_id", category)
  .where("difficulty_id", difficulty)
  .where("approved", 1)
  .orderBy("id","ASC")
}
const getByDifficulty = (difficulty) => {
  return getKnex()(tables.quiz)
  .select()
  .where("difficulty_id", difficulty)
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
    category_id: quiz.category_id,
    difficulty_id: quiz.difficulty_id,
    question: dec_q,
    correct_answer: dec_c,
    approved: 0,
    author: dec_au,
    incorrect_answers: JSON.stringify(dec_inc)
  })
}

const updateQuiz = (id, {...quiz}) => {

  let dec_q = he.decode(quiz.question);
  let dec_c = he.decode(quiz.correct_answer);
  let dec_inc = quiz.incorrect_answers.map((e) => he.decode(e));
    try{  
      getKnex()(tables.quiz)
        .where("id", id)
        .update({
        category_id: quiz.category,
        difficulty_id: quiz.difficulty,
        question: dec_q,
        correct_answer: dec_c,
        incorrect_answers: JSON.stringify(dec_inc)
      });
      return getById(id);
    }
   catch (error){
    const logger = getChildLogger("users-repo");
    logger.error("Error in updateBy", {error});
    throw ServiceError.unknown("This should not have happened/ wrong parameters?");

  }
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
updateQuiz,
deleteQuiz,
getAllNotApproved,
approveQuiz,
getAmount


};