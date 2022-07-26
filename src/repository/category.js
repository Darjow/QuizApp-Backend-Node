const {getKnex, tables} = require("../data");
const ServiceError = require("../core/serviceError");



const getCategories = () => {
  return getKnex()(tables.categories) 
    .select()  
    
};


module.exports = {
  getCategories


};