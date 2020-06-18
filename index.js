'use strict'

const Koa = require('koa');
const logger = require('koa-logger');
const cors = require('@koa/cors');
const router = require('./routes');

const { PORT = 8888 } = process.env;
const app = new Koa();

app.use(logger());
app.use(cors({
   origin: function (ctx) {
      return '*';
   },
}));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
   console.log(`Kazoo server listening on port ${PORT}`);
});