const quizRepository = require(`../repository/quiz`);
const {getChildLogger} = require(`../core/logging`);
const ServiceError = require("../core/serviceError");
const he = require("he")



const debugLog = (message, meta = {}) => {
  if(!this.logger) this.logger = getChildLogger(`quiz-service`);
  this.logger.debug(message,meta);
};

const getAll = async () => {
  debugLog(`Fetching all quizes`);
  const data = await quizRepository.getAll();
  let data_length = await quizRepository.getAmount();
  data_length = data_length[0]["count(*)"];
  return {
    data: data,
    length: data_length,
  }
}
const getById = async (id) => {
  debugLog(`Fetching quizes with ID: ${id} `)
  const data = await quizRepository.getById(id);
  if(!data){
    throw ServiceError.notFound(`No quizes with id: ${id} exists`);
  }
  return  data;
}
const getByCategory = async (category) => {
  const cat = he.decode(category);
  debugLog(`Fetching quizes with Category: ${cat}`);
  const data = await quizRepository.getByCategory(cat);
  if(!data){
    throw ServiceError.notFound(`No quizes with category: ${cat} exist`);
  }
  return {
    data: data,
    length: data.length
  };
}
const getByDifficulty = async (difficulty) => {
  debugLog(`Fetching quizes with difficulty: ${difficulty}`);
  const data = await quizRepository.getByDifficulty(difficulty);
  if(!data){
    throw ServiceError.notFound(`No quizes with difficulty: ${difficulty} exist`);
  }
  return {
    data: data,
    length: data.length
  };
}


const getByCategoryDifficulty = async (category,difficulty) => {
  debugLog(`Fetching quizes with category: ${category} and difficulty: ${difficulty}`);
  
  if(category == "*"){
    if(difficulty == "*"){
      data = await getAll();
    }else{
      data = await getByDifficulty(difficulty);
    }
  }else if(difficulty == "*"){
    if(category != "*"){
      data = await getByCategory(category);
    }
  }else{
   data = await quizRepository.getByCategoryDifficulty(category, difficulty);  data = { data: data, length: data.length }
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
  await getById(id); 
  const correctlyUpdated = await quizRepository.updateQuiz(id, quiz);
  if(!correctlyUpdated){
    throw ServiceError.unauthorized(`Error updating quiz with id: ${id} and parameters ${quiz}`);
  }
}
const createQuiz = async ({... quiz}) => {
  debugLog(`Creating quiz`);
  const data = await quizRepository.getAmount();
  let counter = data[0]["count(*)"] +1;
  const valid = await quizRepository.createQuiz(counter, quiz);
  if(!valid){
    throw ServiceError.unauthorized(`Error creating quiz with parameters ${quiz}`);
  }
}

const approveQuiz = async (id) => {
  debugLog("[ADMIN] Approving quiz with id: " + id);
  const correctlyUpdated = await quizRepository.approveQuiz(id);

  if(!correctlyUpdated){
    throw ServiceError.unknown("Failed to approve quiz with id: " + id);
  }
}

const getAllNotApproved = async () => {
  debugLog("[ADMIN] Grabbing all not approved quizes.")
  const quizes = await quizRepository.getAllNotApproved();
  return quizes;
}
module.exports = {
  getAll,
  getById,
  getByCategory,
  getByDifficulty,
  getByCategoryDifficulty,
  deleteQuiz,
  updateQuiz,
  createQuiz,
  getAllNotApproved,
  approveQuiz
}
