const Router = require("@koa/router");
const categoryService = require("../services/category");


const getCategories = async (ctx) => {
  ctx.body = await categoryService.getCategories();
}

module.exports = (app) => {
  const router = new Router({
    prefix: '/categories',
  });

  router.get("/", getCategories)

	app.use(router.routes()).use(router.allowedMethods());
}


