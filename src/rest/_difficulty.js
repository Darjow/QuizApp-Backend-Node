const Router = require("@koa/router");
const difficultyService = require("../services/difficulties");


const getDifficulties = async (ctx) => {
  ctx.body = await difficultyService.getDifficulties();
}

module.exports = (app) => {
  const router = new Router({
    prefix: '/difficulties',
  });

  router.get("/", getDifficulties)

	app.use(router.routes()).use(router.allowedMethods());
}


