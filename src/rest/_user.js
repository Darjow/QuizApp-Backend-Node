const Router = require("@koa/router");
const userService = require("../services/user");


const getAll = async (ctx) => {
  const limit = ctx.query.limit && Number(ctx.query.limit);
  const offset = ctx.query.offset && Number(ctx.query.offset);
  const response = await userService.getAll(limit? limit:100, offset? offset:0);
  ctx.body = response;
}
const getById = async (ctx) => {
  const user = await userService.getById(ctx.params.id);
  ctx.body = user;

}
const updateById = async (ctx) => {
  const user = await userService.updateById(ctx.params.id,ctx.request.body);
  ctx.body = user;

}
const deleteById = async (ctx) => {
  await userService.deleteById(ctx.params.id);
  ctx.status = 204;
}

const login = async (ctx) => {
  const response = await userService.login(ctx.request.body);
  ctx.body = response;
}

const register = async (ctx) => {
  const response = await userService.register(ctx.request.body);
  ctx.body = response;
}
module.exports = (app) => {
  const router = new Router({
    prefix: '/users',
  });

  router.get("/", getAll);
  router.post("/login",login);
  router.post("/register",register);
  router.get("/:id", getById);
  router.put("/:id", updateById);
  router.delete("/:id", deleteById);




	app.use(router.routes()).use(router.allowedMethods());
}


