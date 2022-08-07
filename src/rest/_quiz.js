const Router = require("@koa/router");
const quizService = require("../services/quiz");
const Joi = require("joi");
const validate = require("./_validation");
const enums = require("../core/Enum");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const roles = require("../core/roles");
const RateLimit = require("koa2-ratelimit").RateLimit


const getAllQuiz = async (ctx) => {
  ctx.body = await quizService.getAll();
}



const getQuizByCategoryDifficulty = async (ctx) => {
  ctx.body = await quizService.getByCategoryDifficulty(ctx.params.category, ctx.params.difficulty);
}

getQuizByCategoryDifficulty.validationSchema = {
  params:{
    category: Joi.alternatives().try(Joi.string().valid(...Object.values(enums.Categories)), Joi.string().valid("*")),
    difficulty:Joi.alternatives().try(Joi.string().valid(...Object.values(enums.Difficulties)), Joi.string().valid("*")),
  }
}


const deleteQuiz = async (ctx) => {
  await quizService.deleteQuiz(ctx.params.id);
  ctx.status = 204;
}

deleteQuiz.validationSchema = {
  params:{
    id: Joi.number().integer().min(1).required()
  }
}
const createQuiz = async (ctx) => {
  ctx.body = await quizService.createQuiz({...ctx.request.body});
  ctx.status = 201;
}
createQuiz.validationSchema = {
  body: {
    category: Joi.string().valid(...Object.values(enums.Categories)).required(),
    difficulty: Joi.string().valid(...Object.values(enums.Difficulties)).required(),
    incorrect_answers: Joi.array().min(1).max(3).items(Joi.string().min(1).max(50), Joi.string().valid(Joi.in("/correct_answer")).forbidden()).required(),
    correct_answer: Joi.alternatives(Joi.string(), Joi.number()).required(),
    approved: Joi.number().optional().default(0),
    question: Joi.string().min(10).max(150).required(),
    author: Joi.string().required(),
  }
}

const getAllNotApproved = async (ctx) => {
  const quizes = await quizService.getAllNotApproved();
  ctx.body = quizes;
}


const approveQuiz = async (ctx) => {
  ctx.body = await quizService.approveQuiz(Number(ctx.params.id))

}
approveQuiz.validationSchema = {
  params:{
    id: Joi.number().integer().min(1).required()
  }
}


const createQuizLimiter = RateLimit.middleware({
  interval: {min:1},
  max: 10,
  message: "Please wait to upload more quizes"
})


module.exports = (app) => {

  const router = new Router({
    prefix: "/quiz",
  });


  router.get('/', requireAuthentication, getAllQuiz);
  router.get("/:category/:difficulty", requireAuthentication, validate(getQuizByCategoryDifficulty.validationSchema),getQuizByCategoryDifficulty);


  router.post("/", createQuizLimiter,  requireAuthentication ,validate(createQuiz.validationSchema), createQuiz);


  
  const requireAdmin = makeRequireRole(roles.ADMIN);

  router.delete("/:id", requireAuthentication, requireAdmin, deleteQuiz);


  router.get("/admin", requireAuthentication, requireAdmin, getAllNotApproved);
  router.post("/admin/:id", requireAuthentication, requireAdmin, validate(approveQuiz.validationSchema), approveQuiz)
 
	app.use(router.routes()).use(router.allowedMethods());

}






