const Router = require("@koa/router");
const userService = require("../services/user");
const Joi = require("joi");
const validate = require("./_validation");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const roles = require("../core/roles");
const { getChildLogger } = require("../core/logging");


const getAll = async (ctx) => {
  const limit = ctx.query.limit && Number(ctx.query.limit);
  const offset = ctx.query.offset && Number(ctx.query.offset);
  const response = await userService.getAll(limit, offset);
  ctx.body = response;
}

getAll.validationScheme = {
    query: Joi.object({
      limit: Joi.number().positive().integer().max(100).optional(),
      offset: Joi.number().integer().min(0).optional()
    }).and("limit", "offset"),
  };


const getById = async (ctx) => {
  ctx.body = await userService.getById(ctx.params.id);
}

getById.validationScheme = {
  params:{
    id: Joi.number().integer().min(1).required()
  }
}
const updateById = async (ctx) => {
  ctx.body = await userService.updateById(ctx.params.id,ctx.request.body);
  ctx.status = 204;
}

updateById.validationScheme = {
  params:{
    id: Joi.number().integer().min(1).required()
  },
  body:{
    email: Joi.string().email().max(50),
    username: Joi.string().max(20),
    firstname: Joi.string().max(20),
    lastname: Joi.string().max(20),
    password: Joi.string().min(8),
   // newPassword: Joi.string().min(8).optional()
  }
}
const deleteById = async (ctx) => {
  await userService.deleteById(ctx.params.id);
  ctx.status = 204;
}
deleteById.validationScheme = {
  params:{
    id: Joi.number().integer().min(1).required()
  },
}

const login = async (ctx) => {

    const response = await userService.login(ctx.request.body);
    ctx.body = response;

}

login.validationScheme = {
  body: {
    username: Joi.string().max(20),
    password: Joi.string().min(8).max(50)
  }
}

const register = async (ctx) => {
  const response=  await userService.register(ctx.request.body);
  ctx.body = response;
  }

  register.validationScheme = {
      body: {
        username: Joi.string().max(20).required(),
        email: Joi.string().email().max(50).required(),
        firstname: Joi.string().max(20).required(),
        lastname: Joi.string().max(20).required(),
        password: Joi.string().min(8).required()
    }
  }


module.exports = (app) => {
  const router = new Router({
    prefix: '/users',
  });

  router.post("/login", validate(login.validationScheme),login);
  router.post("/register",validate(register.validationScheme),register);
 
  const requireAdmin = makeRequireRole(roles.ADMIN);

  router.get("/:id", validate(getById.validationScheme),requireAuthentication, getById);
  router.put("/:id", validate(updateById.validationScheme),requireAuthentication,updateById);

  router.delete("/:id",validate(deleteById.validationScheme),  requireAuthentication, requireAdmin, deleteById);
  router.get("/", validate(getAll.validationScheme), requireAuthentication, requireAdmin,  getAll);




	app.use(router.routes()).use(router.allowedMethods());
}


