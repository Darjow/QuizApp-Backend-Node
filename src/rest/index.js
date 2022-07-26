const Router = require('@koa/router');
const installQuizRouter = require('./_quiz');
const installUserRouter = require("./_user");
const installCategoryRouter = require("./_category");
const installDifficultyRouter = require("./_difficulty")



module.exports = (app) => {
	const router = new Router({
		prefix: '/api',
	});
  installQuizRouter(router);
	installUserRouter(router);
	installCategoryRouter(router);
	installDifficultyRouter(router);

	
	app.use(router.routes()).use(router.allowedMethods());
};