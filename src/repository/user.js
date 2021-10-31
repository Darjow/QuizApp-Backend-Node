const {getKnex, tables} = require("../data");

const login = (username, password) => {
  return getKnex()(tables.users)
  .select()
  .where(getKnex().raw(`Username = "${username}"`))
  .where(getKnex().raw(`Password = "${password}"`))

}
  



module.exports = {
  login,
}