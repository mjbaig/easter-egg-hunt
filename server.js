'use strict'

const Koa = require('koa');
const Router = require('koa-router');
const checkForEggHandler = require('./handlers/check-for-egg');
const getPlayerId = require('./handlers/get-player-id');
const reportLostEgg = require('./handlers/report-lost-egg');

var app = new Koa();
var router = new Router();

const PORT = 4200;

router.get('/player-id', getPlayerId);

router.get('/:playerId/:playerLocation/report-lost-egg', reportLostEgg);

router.get('/:playerLocation/check-for-egg', checkForEggHandler);

app
.use(router.routes())
.use(router.allowedMethods);


app
.listen(PORT, () => {
	console.log("listening on port: ",PORT)
});