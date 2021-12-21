const {getKnex, tables} = require("../data");
const getChildLogger = require("../core/logging").getChildLogger;




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
    throw error;
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

  const check = await getKnex()(tables.users)
    .select()
    .where("id", id)
    .first();
  
  try{
    if(check){
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
    }else{
       return 0;
    }
    
 } catch (error){
    const logger = getChildLogger("users-repo");
    logger.error("Error in updateBy", error);
    throw error;
  }
}

const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.users)
    .delete()
    .where("id",id);
    return rowsAffected > 0;
  }catch (error) {
    const logger = getChildLogger("users-repo");
    logger.error("Error in deleteby", {error});
    throw error;
  }
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
  findByUsername
}