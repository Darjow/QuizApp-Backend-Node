const gamesRepository = require(`../repository/games`);
const {getChildLogger} = require(`../core/logging`);
const ServiceError = require("../core/serviceError");


const debugLog = (message, meta = {}) => {
  if(!this.logger) this.logger = getChildLogger(`games-service`);
  this.logger.debug(message,meta);
};


const createGame = async ({playerID, quizID, score}) => {
  debugLog(`Creating game with parameters playerID: ${playerID}, quizID: ${quizID}, score: ${score}`);
  const valid = await gamesRepository.createGame(playerID, quizID, score);
  if(!valid){
    throw ServiceError.unauthorized(`Error creating games with parameters ${game}`);
  }
}
const getAllGames = async () => {
  debugLog(`Fetching all games`);
  const data =  await gamesRepository.getAllGames();
  return data;
}


module.exports = {
  createGame,
  getAllGames
}