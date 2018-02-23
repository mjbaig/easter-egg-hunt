'use strict'

const Koa = require('koa');
const Router = require('koa-router');
const checkForEggHandler = require('./handlers/check-for-egg');
const getPlayerId = require('./handlers/get-player-id');

var app = new Koa();
var router = new Router();

const PORT = 8080;

router.get('/player-id', getPlayerId);

router.post('/:playerId/:playerLocation/report-lost-egg', async (ctx, next) => {
	ctx.body = ctx.params;
});

router.get('/:playerLocation/check-for-egg', checkForEggHandler);

app
.use(router.routes())
.use(router.allowedMethods);


app
.listen(PORT, () => {
	console.log("listening on port: ",PORT)
});