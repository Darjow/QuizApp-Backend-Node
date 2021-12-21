const userRepository = require(`../repository/user`);
const {getChildLogger} = require(`../core/logging`);
const { hashPassword, verifyPassword } = require("../core/password");
const roles = require("../core/roles");
const { generateJWT } = require("../core/jwt");


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
const checkUnique = (emailcheck,usercheck) => {
  if(emailcheck || usercheck){
    if(usercheck && emailcheck){
      throw new Error("Email and Username already in use.");
    }if(emailcheck){
      throw new Error("Email already in use.");
    }if(usercheck){
      throw new Error("Username already in use.");
    }
  }
}

const login = async ({username, password})  => {
  debugLog("Login Request Received.")
  const user = await userRepository.findByUsername(username);

  if(!user){
    throw new Error("The given username does not exist.");
  }
  const passwordValid = await verifyPassword(password,user.password_hash);
  
  if(!passwordValid){
    throw new Error("The given user and password do not match");
  }

  return await makeLoginData(user);

}
const register = async ({email,username,firstname,lastname,password}) => {
  debugLog(`Register request received with parameters:${email} ${username} ${firstname} ${lastname}, ${password} `);
  const emailcheck = await userRepository.findByEmail(email);
  const usercheck = await userRepository.findByUsername(username);
  checkUnique(emailcheck,usercheck);

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
const getAll = async ({limit = 100, offset = 0}) => {
  debugLog("Fetching all users request received");
  const data = await userRepository.findAll({limit,offset});
  const count = await userRepository.findCount();
  return { data, count }

}
const getById = async (id) => {
  debugLog(`Fetching player with id ${id}`);
  const user = await userRepository.findById(id);
  if(!user){
    throw new Error(`No user with id ${id} exists`);
  }
  return makeLoginData(user);
}

const updateById = async (id,{...user}) => {
  const check = await userRepository.updateById(id,user);
  if(check === 0){
    throw new Error("No user found to update.");
  }
}
const deleteById = async (id) => {
  const deleted = await userRepository.deleteById(id);
  if(!deleted){
    throw new Error(`No user with id ${id} exists`);
  }
}

module.exports = {
  login,
  register,
  getAll,
  getById,
  updateById,
  deleteById
}