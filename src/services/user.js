const userRepository = require(`../repository/user`);
const {getChildLogger} = require(`../core/logging`);
const { hashPassword, verifyPassword } = require("../core/password");
const roles = require("../core/roles");
const { generateJWT, verifyJWT } = require("../core/jwt");
const ServiceError = require("../core/serviceError");


const debugLog = (message, meta = {}) => {
  if(!this.logger) this.logger = getChildLogger(`user-service`);
  this.logger.debug(message,meta);
};

const returnValue = ({password_hash, ...user}) => user;

const makeLoginData = async (user) => {
  const token = await generateJWT(user);
  return {
    token,
    user: returnValue(user),
  }
}
const checkUnique = async (id, email,username) => {
  const emailcheck = await userRepository.findByEmail(email);
  const usercheck =  await userRepository.findByUsername(username);

  //update
  if(id){
    if(usercheck || emailcheck){
      if(usercheck && emailcheck){
        if(usercheck.id === id && emailcheck.id === id) return false;
        if(usercheck.id !== id && emailcheck.id !== id) throw ServiceError.emailAndUsernameInUse("Email and username already in use.");
      }else if(usercheck){
        if(usercheck.id !== id) throw ServiceError.usernameInUse("Username already in use.");
        if(emailcheck.id !== id) throw ServiceError.emailInUse("Email already in use.");
    }
  }
}
  //create
  else if(emailcheck || usercheck){
    if(usercheck && emailcheck) throw ServiceError.emailAndUsernameInUse("Email and username already in use.");
    if(usercheck) throw ServiceError.usernameInUse("Username already in use.");
    if(emailcheck) throw ServiceError.emailInUse("Email already in use.");
  }

  return false;
}

const login = async ({username, password})  => {
  debugLog(`Login Request Received with parameters ${username}, ${password}.`)
  const user = await userRepository.findByUsername(username);
  if(!user){
    throw ServiceError.wrongCredentials("Username does not exist");
  }
  const passwordValid = await verifyPassword(password,user.password_hash);
  
  if(!passwordValid){
    throw ServiceError.wrongCredentials("Password is not valid.");
  }

  return await makeLoginData(user);

}
const register = async ({email,username,firstname,lastname,password}) => {
  debugLog(`Register request received with parameters:${email} ${username} ${firstname} ${lastname}, ${password} `);
  await checkUnique(id=null,email,username); //throws error if needed
  const passwordHash = await hashPassword(password);
  const user = await userRepository.create({
    email,
    username,
    firstname,
    lastname,
    password_hash:passwordHash,
    roles: [roles.USER]
  });

  return await makeLoginData(user);
}

const getById = async (id) => {
  debugLog(`Fetching player with id ${id}`);
  const user = await userRepository.findById(id);
  if(!user){
    throw ServiceError.unauthorized(`No user with id ${id} exists`);
  }
  return makeLoginData(user);
}



const checkAndParseSession = async (authHeader) => {
  if (!authHeader) {
    throw ServiceError.unauthorized('You need to be signed in.');
  }

  if (!authHeader.startsWith('Bearer ')) {
    throw ServiceError.unauthorized('Invalid authentication token');
  }

  const authToken = authHeader.substr(7);
  try {
    const {
      roles, id,
    } = await verifyJWT(authToken);

    return {
      id,
      roles,
      authToken,
    };
  } catch (error) {
    const logger = getChildLogger('user-service');
    logger.error(error.message, { error });
    throw ServiceError.unauthorized("Jwt has expired.");
  }
};


const checkRole = (role, roles) => {
  const hasPermission = roles.includes(role);

  if (!hasPermission) {
    throw ServiceError.unauthorized('You are not allowed to view this part of the application');
  }
};

const getByUsername = async (username) => {
  debugLog(`Fetching user with username: ${username}`);
  const user = await userRepository.findByUsername(username);
  if(!user){
    throw ServiceError.notFound(`No user found with username: ${username}`);
  }
    return user;
  }

  const addScore = async (id, {score})  => {
    debugLog(`Updating score with ${score} from player ${id}`)
    const user = await userRepository.updateScore(id, score);
    if(!user){
      throw ServiceError.unknown(`An unknown error has happened updating a quiz with parameters ID: ${id} , SCORE: ${score}` )
    }else{
      return user;
    }
    }
    


module.exports = {
  login,
  register,
  getById,
  checkAndParseSession,
  checkRole,
  getByUsername,
  addScore
}