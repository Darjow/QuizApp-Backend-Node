const Router = require("@koa/router");
const gamesService = require("../services/games.js");
const { requireAuthentication } = require("../core/auth");
const Joi = require("joi");
const validate = require("./_validation.js");



const createGame =  async (ctx) =>{ 
  await gamesService.createGame(ctx.request.body);
  ctx.status = 201;

}

createGame.validationSchema = {
  body: {
    playerID: Joi.number().min(1).max(999999).required(),
    quizID: Joi.number().min(1).max(999999).required(),
    score: Joi.number().min(-100).max(100).required()
  }
}

const getAllGames = async (ctx) => {
  const games = await gamesService.getAllGames();
  ctx.body =  games;
}

module.exports = (app) => {
  const router = new Router({
    prefix: '/games',
  });


  router.get('/', requireAuthentication, getAllGames)
  router.post('/', requireAuthentication,  validate(createGame.validationSchema), createGame);

	app.use(router.routes()).use(router.allowedMethods());
}


