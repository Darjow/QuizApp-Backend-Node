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

  return {
    data: data,
    length: data.length /*data_length*/,
  }
}
const getByCategory = async (category) => {
  const cat = he.decode(category);
  debugLog(`Fetching quizes with Category: ${cat}`);
  const data = await quizRepository.getByCategory(cat);
  
  return {
    data: data,
    length: data.length
  };
}
const getByDifficulty = async (difficulty) => {
  debugLog(`Fetching quizes with difficulty: ${difficulty}`);
  const data = await quizRepository.getByDifficulty(difficulty);
 
  return {
    data: data,
    length: data.length
  };
}


const getByCategoryDifficulty = async (category,difficulty) => {
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
    debugLog(`Fetching quizes with category: ${category} and difficulty: ${difficulty}`);
    data = await quizRepository.getByCategoryDifficulty(category, difficulty);  data = { data: data, length: data.length }
  }

  if(data.length == 0){
    throw ServiceError.notFound(`No quizes with parameters: ${category}, ${difficulty} exist.`);
  }

  return data;
}

const deleteQuiz = async (id) => {
  debugLog(`Deleting quiz with ID: ${id}`);
  const deleted = await quizRepository.deleteQuiz(id);
  if(!deleted){
    throw ServiceError.notFound(`No quiz found with id: ${id}.`);
  }
  }

const createQuiz = async ({... quiz}) => {
  debugLog(`Creating quiz`);
  let id = await quizRepository.getHighestID(); id = id[0].id
  await quizRepository.createQuiz(id + 1, quiz);

  //NO SERVICE ERROR AS IT NEEDS TO PASS THE REST JOI VERIFICATION
  // MADE TEST TO TEST THIS VERIFICATION
  
  return await quizRepository.getById(id + 1);
}


const approveQuiz = async (id) => {
  debugLog("[ADMIN] Approving quiz with id: " + id);
  await quizRepository.approveQuiz(id);
  return await quizRepository.getById(id)
}

const getAllNotApproved = async () => {
  debugLog("[ADMIN] Grabbing all not approved quizes.")
  const quizes = await quizRepository.getAllNotApproved();
  return {
    data: quizes,
    length:quizes.length
  };
}
module.exports = {
  getAll,
  getByCategoryDifficulty,
  deleteQuiz,
  createQuiz,

  getAllNotApproved,
  approveQuiz
}
