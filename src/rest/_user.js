const Router = require("@koa/router");
const userService = require("../services/user");
const Joi = require("joi");
const validate = require("./_validation");
const { requireAuthentication } = require("../core/auth");




const getById = async (ctx) => {
  ctx.body = await userService.getById(ctx.params.id);
}

getById.validationScheme = {
  params:{
    id: Joi.number().integer().min(1).required()
  }
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

  
  const addScore = async(ctx) => {
    const response = await userService.addScore(ctx.params.id, ctx.request.body);
    ctx.body = response;
  }
  addScore.validationScheme = {
    body:{
      score: Joi.number().min(-100).max(100)
    }
  }


module.exports = (app) => {
  const router = new Router({
    prefix: '/users',
  });

  router.post("/login", validate(login.validationScheme),login);
  router.post("/register",validate(register.validationScheme),register);
 
  router.post("/:id/score", validate(addScore.validationScheme), requireAuthentication, addScore)
  router.get("/:id", validate(getById.validationScheme),requireAuthentication, getById);





	app.use(router.routes()).use(router.allowedMethods());
}


