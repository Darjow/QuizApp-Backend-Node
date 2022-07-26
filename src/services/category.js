const categoryRepository = require(`../repository/category`);
const {getChildLogger} = require(`../core/logging`);
const ServiceError = require("../core/serviceError");



const debugLog = (message, meta = {}) => {
  if(!this.logger) this.logger = getChildLogger(`category-service`);
  this.logger.debug(message,meta);
};

const getCategories = async () => {
  debugLog(`Fetching all categories`);
  return await categoryRepository.getCategories();
}


module.exports = {
  getCategories
}
