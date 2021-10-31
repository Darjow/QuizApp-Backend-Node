const Router = require("@koa/router");
const userService = require("../services/user");


const login =  async(ctx) => {
  ctx.body =  await userService.login(ctx.request.body.username, ctx.request.body.password);

}

module.exports = (app) => {
  const router = new Router({
    prefix: '/user',
  });

  router.post('/login',login);


	app.use(router.routes()).use(router.allowedMethods());
}


