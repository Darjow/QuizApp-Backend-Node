const quizRepository = require(`../repository/quiz`);
const {getChildLogger} = require(`../core/logging`);
const ServiceError = require("../core/serviceError");



const debugLog = (message, meta = {}) => {
  if(!this.logger) this.logger = getChildLogger(`quiz-service`);
  this.logger.debug(message,meta);
};

const getAll = async (limit = 100, offset = 0) => {
  debugLog(`Fetching all quizes`);
  const data = await quizRepository.getAll({limit,offset});
  return {
    data: data,
    length: data.length
  }
}
const getById = async (id) => {
  debugLog(`Fetching quizes with ID: ${id} `)
  const data = await quizRepository.getById(id);
  if(!data){
    throw ServiceError.notFound(`No quizes with id: ${id} exists`);
  }
  return data;
}
const getByCategory = async (category) => {
  debugLog(`Fetching quizes with Category: ${category}`);
  const data = await quizRepository.getByCategory(category);
  if(!data){
    throw ServiceError.notFound(`No quizes with category: ${category} exist`);
  }
  return data;
}
const getByDifficulty = async (difficulty) => {
  debugLog(`Fetching quizes with difficulty: ${difficulty}`);
  const data = await quizRepository.getByDifficulty(difficulty);
  if(!data){
    throw ServiceError.notFound(`No quizes with difficulty: ${difficulty} exist`);
  }
  return data;
}
const getByCategoryDifficulty = async (category,difficulty) => {
  debugLog(`Fetching quizes with category: ${category} and difficulty: ${difficulty}`);
  let data;
  if(category == 0){
    if(difficulty == 0){
      data = await getAll();
    }else{
      data = await getByDifficulty(difficulty);
    }
  }else if(difficulty == 0){
    if(category != 0){
      data = await getByCategory(category);
    }
  }else{
   data = await quizRepository.getByCategoryDifficulty(category,difficulty);
  }

  if(!data){
    throw ServiceError.notFound(`No quizes with parameters: ${category} ${difficulty} exist`);
  }
  return data;
}
const deleteQuiz = async (id) => {
  debugLog(`Deleting quiz with ID: ${id}`);
  const deleted = await quizRepository.deleteQuiz(id);
  if(!deleted){
    throw ServiceError.notFound(`No quiz found with id: ${id} exists`);
    }
  }

const updateQuiz = async (id, {... quiz}) => {
  debugLog(`Updating quiz with id: ${id}`);
  await getById(id); //throws error if no quiz found
  const correctlyUpdated = await quizRepository.updateQuiz(id, quiz);
  if(!correctlyUpdated){
    throw ServiceError.unauthorized(`Error updating quiz with id: ${id} and parameters ${quiz}`);
  }
}
const createQuiz = async ({... quiz}) => {
  debugLog(`Creating quiz`);
  const valid = await quizRepository.createQuiz(quiz);
  if(!valid){
    throw ServiceError.unauthorized(`Error creating quiz with parameters ${quiz}`);
  }
}

module.exports = {
  getAll,
  getById,
  getByCategory,
  getByDifficulty,
  getByCategoryDifficulty,
  deleteQuiz,
  updateQuiz,
  createQuiz
}
