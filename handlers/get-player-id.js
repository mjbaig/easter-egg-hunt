'use strict'
const databasePromise = require('../config/sqlite');
const crypto = require('crypto');

async function getPlayerId(ctx, next){
    try{
        var database = await databasePromise;
        var randomlyGeneratedPlayerId = crypto.randomBytes(10).toString('hex');
    
        await database.exec(`INSERT INTO player_scores (playerId, points) VALUES ('`+randomlyGeneratedPlayerId+`', `+0+`);`);    
    
        ctx.body = {playerId: randomlyGeneratedPlayerId};

    }catch(e){
        console.error(e);
        ctx.body = {error: "Player id was not generated. Please try again"};
    }

}

module.exports = getPlayerId;