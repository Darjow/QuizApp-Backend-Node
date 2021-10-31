const userRepository = require(`../repository/user`);
const {getChildLogger} = require(`../core/logging`);




const debugLog = (message, meta = {}) => {
  if(!this.logger) this.logger = getChildLogger(`user-service`);
  this.logger.debug(message,meta);
};


const login = async (username, password)  => {
  debugLog("Login Request Received.")
  const data =  await userRepository.login(username,password);
  return data;
}



module.exports = {
  login,
}