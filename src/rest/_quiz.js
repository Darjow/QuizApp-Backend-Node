const Router = require("@koa/router");
const quizService = require("../services/quiz");
const Joi = require("joi");
const validate = require("./_validation");
const enums = require("../core/Enum");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const roles = require("../core/roles");



const getAllQuiz = async (ctx) => {
  ctx.body = await quizService.getAll();
}
const getQuizById = async (ctx) => {
  ctx.body = await quizService.getById(Number(ctx.params.id));
}

getQuizById.validationSchema = {
  params:{
    id: Joi.number().integer().min(1).required()
  }
}
const getQuizByCategory = async (ctx) => {
  ctx.body = await quizService.getByCategory(ctx.params.category);
}

getQuizByCategory.validationSchema = {
  params: {
    category: Joi.string().valid(...Object.values(enums.Categories)).required()
  }
}

const getQuizByDifficulty = async (ctx) => {
  ctx.body = await quizService.getByDifficulty(ctx.params.difficulty);
}

getQuizByDifficulty.validationSchema = {
  params: {
    difficulty: Joi.string().valid(...Object.values(enums.Difficulty)).required()
  }
}

const getQuizByCategoryDifficulty = async (ctx) => {
  ctx.body = await quizService.getByCategoryDifficulty(ctx.params.category, ctx.params.difficulty);
}

getQuizByCategoryDifficulty.validationSchema = {
  params:{
    category: Joi.number().min(0).max(99),
    difficulty: Joi.number().min(0).max(99)
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
  const newQuiz = await quizService.createQuiz({...ctx.request.body});
  ctx.body = newQuiz;
}
createQuiz.validationSchema = {
  body: {
    //category: Joi.string().valid(...Object.values(enums.Categories)).required(),
    //difficulty: Joi.string().valid(...Object.values(enums.Difficulty)).required(),
    category_id: Joi.number().min(1).max(Object.keys(enums.Categories).length),
    difficulty_id: Joi.number().min(1).max(Object.keys(enums.Difficulty).length),
    incorrect_answers: Joi.array().items().min(1).max(3),
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



module.exports = (app) => {

  const router = new Router({
    prefix: "/quiz",
  });


  router.get('/', requireAuthentication, getAllQuiz);
  router.get('/id=:id', validate(getQuizById.validationSchema),getQuizById);
  router.get('/category=:category', validate(getQuizByCategory.validationSchema), getQuizByCategory);
  router.get("/difficulty=:difficulty", validate(getQuizByDifficulty.validationSchema, getQuizByDifficulty));
  router.get("/:category/:difficulty", validate(getQuizByCategoryDifficulty.validationSchema),getQuizByCategoryDifficulty);


  router.post("/", requireAuthentication, validate(createQuiz.validationSchema), createQuiz);


  
  const requireAdmin = makeRequireRole(roles.ADMIN);

  router.delete("/:id", requireAuthentication, requireAdmin, deleteQuiz);


  router.get("/admin", requireAuthentication, requireAdmin, getAllNotApproved);
  router.post("/admin/:id", requireAuthentication, requireAdmin, validate(approveQuiz.validationSchema), approveQuiz)
 
	app.use(router.routes()).use(router.allowedMethods());

}






