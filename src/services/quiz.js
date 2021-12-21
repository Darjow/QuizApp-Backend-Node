const quizRepository = require(`../repository/quiz`);
const {getChildLogger} = require(`../core/logging`);


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
  return data;
}
const getByCategory = async (category) => {
  debugLog(`Fetching quizes with Category: ${category}`);
  const data = await quizRepository.getByCategory(category);
  return data;
}
const getByDifficulty = async (difficulty) => {
  debugLog(`Fetching quizes with difficulty: ${difficulty}`);
  const data = await quizRepository.getByDifficulty(difficulty);
  return data;
}
const getByCategoryDifficulty = async (category,difficulty) => {
  debugLog(`Fetching quizes with category and difficulty: ${category} and difficulty ${difficulty}`);
  const data = await quizRepository.getByCategoryDifficulty(category,difficulty);
  return data;
}
const deleteQuiz = async (id) => {
  debugLog(`Deleteing quiz with ID: ${id}`);
  await quizRepository.deleteQuiz(id);
}
const updateQuiz = async (id, {... quiz}) => {
  debugLog(`Updating quiz with id: ${id}`);
  if(quiz.author !== "System") quiz.approved = false;
  await quizRepository.updateQuiz(id, quiz);
}
const createQuiz = async ({... quiz}) => {
  debugLog(`Creating quiz`);
  await quizRepository.createQuiz(quiz);
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
