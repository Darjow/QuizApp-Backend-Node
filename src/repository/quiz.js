const {getKnex, tables} = require("../data");
const he = require(`he`); //DECODE HTML ENTITY -> UTF 8
const ServiceError = require("../core/serviceError");



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
//  .where("Approved", 1)
  .where("id", id)


}
const getByCategory = (category) => {
  return getKnex()(tables.quiz)
  .select()
  .where("category", category)
  .orderBy("id", "ASC")
}
const getByCategoryDifficulty = (category,difficulty) => {
  return getKnex()(tables.quiz)
  .select()
  .where("category", category)
  .where("difficulty", difficulty)
  .orderBy("id","ASC")
}
const getByDifficulty = (difficulty) => {
  return getKnex()(tables.quiz)
  .select()
  .where("difficulty", difficulty)
  .orderBy("id", "ASC")
}
const createQuiz = ({... quiz}) => {
  let dec_q = he.decode(quiz.question);
  let dec_c = typeof(quiz.correct_answer) === "number"? quiz.correct_answer : he.decode(quiz.correct_answer);
  let dec_au = he.decode(quiz.author);
  let dec_inc = quiz.incorrect_answers.map((e) => he.decode(e));

  if(quiz.author != "System") quiz.approved = false;

  return getKnex()(tables.quiz)
  .insert({
    category: quiz.category,
    type: quiz.type,
    difficulty: quiz.difficulty,
    question: dec_q,
    correct_answer: dec_c,
    approved: quiz.approved,
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
        category: quiz.category,
        type: quiz.type,
        difficulty: quiz.difficulty,
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