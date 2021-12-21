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
  let dec_q = he.decode(quiz.Question);
  let dec_c = he.decode(quiz.Correct_Answer);
  let dec_au = he.decode(quiz.Author);
  let dec_inc = quiz.Incorrect_Answers.map((e) => he.decode(e));

  if(quiz.Author != "System") quiz.Approved = false;

  return getKnex()(tables.quiz)
  .insert({
    category: quiz.Category,
    type: quiz.Type,
    difficulty: quiz.Difficulty,
    question: dec_q,
    correct_Answer: dec_c,
    approved: quiz.Approved,
    author: dec_au,
    incorrect_Answers: JSON.stringify(dec_inc)
  })
}
// NOT IMPLEMENTED - Security checks (Approving, changing authors, ... )
const updateQuiz = (id, {...quiz}) => {
  let dec_q = he.decode(quiz.Question);
  let dec_c = he.decode(quiz.Correct_Answer);
  let dec_au = he.decode(quiz.Author);
  let dec_inc = quiz.Incorrect_Answers.map((e) => he.decode(e));
  
  try{
     getKnex()(tables.quiz)
    .where("id", id)
    .update({
      category: quiz.Category,
      type: quiz.Type,
      difficulty: quiz.Difficulty,
      question: dec_q,
      correct_Answer: dec_c,
      approved: quiz.Approved,
      author: dec_au,
      incorrect_Answers: JSON.stringify(dec_inc)
    })
    return findById(id);
  } catch (error){
    const logger = getChildLogger("users-repo");
    logger.error("Error in updateBy", {error});
    throw error;
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