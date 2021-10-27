const Router = require('@koa/router');
const installQuizRouter = require('./_quiz');



module.exports = (app) => {
	const router = new Router({
		prefix: '/api',
	});

  installQuizRouter(router);
	app.use(router.routes()).use(router.allowedMethods());
};