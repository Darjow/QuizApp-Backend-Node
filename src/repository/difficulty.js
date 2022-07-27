const {getKnex, tables} = require("../data");



const getDifficulties = () => {
  return getKnex()(tables.difficulties) 
    .select()  
    
};


module.exports = {
  getDifficulties


};