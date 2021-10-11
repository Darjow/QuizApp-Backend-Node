// Koa importeren = require('koa')
const Koa = require('koa');
const logger = require('./core/logging').getLogger();
const app = new Koa();
const port = 3000;

app.listen(port);
logger.info(`Server listening on http://localhost:${port}`);