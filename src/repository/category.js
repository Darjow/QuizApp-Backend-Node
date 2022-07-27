const {getKnex, tables} = require("../data");



const getCategories = () => {
  return getKnex()(tables.categories) 
    .select()  
    
};


module.exports = {
  getCategories


};