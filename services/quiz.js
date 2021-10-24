const logger = require("../src/core/logging").getLogger();
const he = require("he"); //DECODE HTML ENTITY -> UTF 8
const performQuery = require("../src/databank/dbQueries").sqlDatabase;


const getAll = async () => {
  return Promise.resolve(performQuery("SELECT * FROM QUIZ"));

}
const getById = async (id) => {
  return Promise.resolve(performQuery(`SELECT * FROM QUIZ where id =${id}`));
}

const getByCategory= async(category) => {
  return Promise.resolve(performQuery(`SELECT * FROM QUIZ where category =${category}`))
  
}
const getByDifficulty = async (difficulty) => {
  return Promise.resolve(performQuery(`SELECT * FROM QUIZ where difficulty =${difficulty}`))
  
}
const getBy = async (category, difficulty) => {
  return Promise.resolve(performQuery(`SELECT * FROM QUIZ where category =${category} and where difficulty= ${difficulty}`))
  }

const deleteById = async (id) => {
  return Promise.resolve(performQuery(`Delete from quiz where id= ${id}`));
};
const updateById = async (idInput,{category,type, difficulty, question, correct_answer, approved, author, incorrect_answers}) => {

  const q = he.decode(question);
  const ca = he.decode(correct_answer);
  const ia = he.decode(incorrect_answers);

  return Promise.resolve(performQuery(`Update quiz set category=${category}, type=${type}, difficulty=${difficulty},question=${q}, correct_answer=${ca},incorrect_answers=${ia}, approved=${approved}, author=${author} where id=${idInput}`));
  
}

const create = async ({Category,Type, Difficulty, Question, Correct_Answer, Approved, Author, Incorrect_Answers}) => {

  const q = he.decode(Question);
  const ca = he.decode(Correct_Answer);
  const ia =JSON.stringify(Incorrect_Answers.map(e => he.decode(e)));

  return Promise.resolve(performQuery(`
  Insert into quiz(Category,Type,Difficulty,Question,Correct_Answer,Approved,Author,Incorrect_answers) 
  values ("${Category}","${Type}","${Difficulty}","${q}","${ca}",${Approved},"${Author}",'${ia}')`));
}


module.exports =  {
  getAll,
  getById,
  getByCategory,
  getByDifficulty,
  getBy,

  deleteById,
  create,
  updateById
  
}
