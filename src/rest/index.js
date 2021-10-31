const Router = require('@koa/router');
const installQuizRouter = require('./_quiz');
const installUserRouter = require("./_user");


module.exports = (app) => {
	const router = new Router({
		prefix: '/api',
	});
  installQuizRouter(router);
	installUserRouter(router);

	
	app.use(router.routes()).use(router.allowedMethods());
};