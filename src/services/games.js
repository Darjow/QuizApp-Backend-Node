const gamesRepository = require(`../repository/games`);
const {getChildLogger} = require(`../core/logging`);


const debugLog = (message, meta = {}) => {
  if(!this.logger) this.logger = getChildLogger(`games-service`);
  this.logger.debug(message,meta);
};


const createGame = async ({playerID, quizID, score}) => {
  debugLog(`Creating game with parameters playerID: ${playerID}, quizID: ${quizID}, score: ${score}`);
  await gamesRepository.createGame(playerID, quizID, score);

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