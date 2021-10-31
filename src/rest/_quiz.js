const Router = require("@koa/router");
const quizService = require("../services/quiz");



const getAllQuiz = async (ctx) => {
  const { limit, offset} = ctx.query;
  ctx.body = await quizService.getAll(Number(limit), Number(offset));
}
const getQuizById = async (ctx) => {
  ctx.body = await quizService.getById(ctx.params.id);
}
const getQuizByCategory = async (ctx) => {
  ctx.body = await quizService.getByCategory(ctx.params.category);
}
const getQuizByDifficulty = async (ctx) => {
  ctx.body = await quizService.getByDifficulty(ctx.params.difficulty);
}
const getQuizByCategoryDifficulty = async (ctx) => {
  ctx.body = await quizService.getByCategoryDifficulty(ctx.params.category, ctx.params.difficulty)
}
const updateQuiz = async (ctx) => {
  ctx.body = await quizService.updateQuiz(ctx.params.id, {...ctx.request.body})
}
const deleteQuiz = async (ctx) => {
  await quizService.deleteQuiz(ctx.params.id);
  ctx.status = 204;
}
const createQuiz = async (ctx) => {
  const newQuiz = await quizService.createQuiz({...ctx.request.body});
  ctx.body = newQuiz;
}


module.exports = (app) => {

  const router = new Router({
    prefix: "/quiz",
  });

  router.get('/', getAllQuiz);
  router.get('/id=:id',getQuizById);
  router.get('/category=:category', getQuizByCategory);
  router.get("/difficulty=:difficulty", getQuizByDifficulty);
  router.get("/:category/:difficulty", getQuizByCategoryDifficulty);
 
  router.put("/:id", updateQuiz);
  router.post("/", createQuiz);
  router.delete("/:id", deleteQuiz);

 
	app.use(router.routes()).use(router.allowedMethods());

}






