const {getLogger} = require('./core/logging');
const config = require('config');
const CORS_ORIGINS = config.get("cors.origins");
const CORS_MAX_AGE = config.get("cors.maxAge");
const Koa = require('koa');
const Router = require("@koa/router")
const koaCors = require("@koa/cors");

const bodyParser = require("koa-bodyparser");
const quizService = require('../services/quiz');


const PORT = config.get("port");
const HOST = config.get("host");



const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(
  koaCors({
    origin: (ctx) => {
      if(CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1){
        return ctx.request.header.origin;
      }
      return CORS_ORIGINS[0];
    },
    allowHeaders: ["Accept", "Content-Type", "Authorization"],
    maxAge: CORS_MAX_AGE,
  })
)

 router.get("/api/quizes", async(ctx) => {
    ctx.body = await quizService.getAll();
  });

router.get("/api/quizes/id=:id", async (ctx) => {
  ctx.body = await quizService.getById(ctx.params.id);
});

router.get("/api/quizes/category=:category",async (ctx) => {
  ctx.body = await quizService.getByCategory(ctx.params.category);
})
router.get("/api/quizes/difficulty=:difficulty", async(ctx) => {
  ctx.body = await quizService.getByDifficulty(ctx.params.difficulty);
})
router.get("/api/quizes/:category/:difficulty",async(ctx) => {
  ctx.body = await quizService.getBy(ctx.params.category,ctx.params.difficulty);
})

router.put("/api/quizes/:id", async(ctx) => {
  ctx.body = await quizService.updateById(ctx.params.id, {...ctx.request.body})
})

router.delete("/api/quizes/:id", async(ctx) => {
  ctx.body = await quizService.deleteById(ctx.params.id);
})

router.post("/api/quizes", async(ctx) => {
    const newQuiz = await quizService.create({...ctx.request.body });
    ctx.body = newQuiz;
  });  

app
  .use(router.routes())
  .use(router.allowedMethods());






app.listen(PORT);
getLogger().info(`Server listening on http://${HOST}:${PORT}`);