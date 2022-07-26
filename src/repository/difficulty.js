const {getKnex, tables} = require("../data");
const ServiceError = require("../core/serviceError");



const getDifficulties = () => {
  return getKnex()(tables.difficulties) 
    .select()  
    
};


module.exports = {
  getDifficulties


};