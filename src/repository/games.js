const {getKnex, tables} = require("../data");



const createGame = (playerID, quizID, score) => {
  return getKnex()(tables.gamesPlayed)
  .insert({
    player_id: playerID,
    quiz_id: quizID,
    score: score
  })
}

const getAllGames =  () => {
  return getKnex()(tables.gamesPlayed).select();
}


module.exports ={
  createGame,
  getAllGames
}