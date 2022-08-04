const Router = require('@koa/router');
const installQuizRouter = require('./_quiz');
const installUserRouter = require("./_user");
const installGamesRouter = require("./_games")


module.exports = (app) => {
	const router = new Router({
		prefix: '/api',
	});
  installQuizRouter(router);
	installUserRouter(router);
	installGamesRouter(router);

	
	app.use(router.routes()).use(router.allowedMethods());
};