const config = require("config");
const knex = require("knex");
const {getChildLogger} = require("../core/logging");

const NODE_ENV = config.get('env');
const isDevelopment = NODE_ENV === 'development';

const DATABASE_CLIENT = config.get('database.client');
const DATABASE_NAME = config.get('database.name')
const DATABASE_HOST = config.get('database.host')
const DATABASE_PORT = config.get('database.port')
const DATABASE_USERNAME = config.get('database.username')
const DATABASE_PASSWORD = config.get('database.password')

let knexInstance;

async function initialiseData(){
  const logger = getChildLogger("database");
  const knexOptions = {
    client: DATABASE_CLIENT,
    connection:{
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      database: DATABASE_NAME,
      user: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      insecureAuth: isDevelopment,
    },
   // debug: true,
  }
  knexInstance = knex(knexOptions);

  try{
    await knexInstance.raw("Select * from quiz as RESULT");

  }catch(error){
    logger.error(error.message, {error});
    throw new error("Could not initialise the data layer");
  }
  logger.info("Data layer succesfully initialised");
  return knexInstance;
}

function getKnex(){
  if(!knexInstance) throw new Error("Please initialize the data layer before getting the knex instance");
  return knexInstance;
}

const tables = Object.freeze({
  quiz: "quiz",
  user: "users",
  //....
});

module.exports = {
  initialiseData,
  getKnex,
  tables
}