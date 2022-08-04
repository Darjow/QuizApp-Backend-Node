const {getKnex, tables} = require("../data");
const getChildLogger = require("../core/logging").getChildLogger;
const ServiceError = require("../core/serviceError");


const login = (username, password) => {
  return getKnex()(tables.users)
  .where(getKnex().raw(`Username = "${username}"`))
  .where(getKnex().raw(`Password = "${password}"`))
}

const create = async ({email,username,firstname,lastname,password_hash,roles}) => {
  try{
    await getKnex()(tables.users).insert({
      email,
      username,
      firstname,
      lastname,
      password_hash:password_hash,
      roles:JSON.stringify(roles)
    });
    return await getKnex()(tables.users)
      .where("email", email)
      .where("username", username)
      .first()
  }catch (error){
    const logger = getChildLogger("users-repo");
    logger.error("Error in create",{error});
    throw ServiceError.unknown("This should not have happened,  wrong parameters?");

  }

}

const findByEmail = (email) => {
  return getKnex()(tables.users)
  .where("email",email)
  .first();
}
const findByUsername = async (username) => {
  return getKnex()(tables.users)
  .where("username",username)
  .first();
}
const findCount = async () => {
  const [count] = await getKnex()(tables.users).count();
  return count["count(*)"];
}
const findById = (id) => {
  return getKnex()(tables.users)
  .where("id",id)
  .first();
}



const updateScore = async (id, score) => {
  const old_score = await getKnex()(tables.users).select("score").where("id",id);
  const data = await getKnex()(tables.users)
    .where("id", id)
    .update("score", (old_score[0].score + score))

    return data;
}


  



module.exports = {
  login,
  create,
  findById,
  findCount,
  findByEmail,
  findByUsername,
  updateScore
}