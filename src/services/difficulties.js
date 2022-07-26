const difficultyRepository = require(`../repository/difficulty`);
const {getChildLogger} = require(`../core/logging`);
const ServiceError = require("../core/serviceError");



const debugLog = (message, meta = {}) => {
  if(!this.logger) this.logger = getChildLogger(`category-service`);
  this.logger.debug(message,meta);
};

const getDifficulties = async () => {
  debugLog(`Fetching all difficulties`);
  return await difficultyRepository.getDifficulties();
}


module.exports = {
  getDifficulties
}
