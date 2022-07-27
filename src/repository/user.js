const {getKnex, tables} = require("../data");
const getChildLogger = require("../core/logging").getChildLogger;
const {verifyPassword} = require("../core/password");
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

const findAll = ({limit, offset}) => {
  return getKnex()(tables.users)
  .select()
  .limit(limit)
  .offset(offset)
  .orderBy("username");
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
const updateById = async (id, {...user}) => {
  const check = await findById(id);
  try{
    if(check){
        const passwordCorrect = await verifyPassword(user.password, check.password_hash);
        if(passwordCorrect){
          await getKnex()(tables.users)
          .update({
            email:user.email,
            username:user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            password_hash:user.password_hash,
          })
          .where("id",id);
          return await findById(id);
        }
        throw ServiceError.unauthorized(`Not possible to change someone else his/her profile.`);    
      }
    else{
      throw ServiceError.notFound(`No user found with id: ${id} `);
    }    
 } catch (error){
    const logger = getChildLogger("users-repo");
    logger.error("Error in updateBy", error);
    throw ServiceError.unknown("This should not have happened/ wrong parameters?");
  }
}

const deleteById = async (id) => {
  const check = await findById(id);
  try{
    if(check){
    const rowsAffected = await getKnex()(tables.users)
    .delete()
    .where("id",id);
    return rowsAffected > 0;
    }
  }catch (error) {
    const logger = getChildLogger("users-repo");
    logger.error("Error in deleteby", {error});
    throw ServiceError.unknown("This should not have happened/ wrong parameters?");

  }
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
  findAll,
  findById,
  updateById,
  deleteById,
  findCount,
  findByEmail,
  findByUsername,
  updateScore
}