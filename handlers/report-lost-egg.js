'use strict'
const databasePromise = require('../config/sqlite');
const eggLocations = require('../resources/egg-locations');
const eggLocationsMap = require('../resources/egg-locations');


async function reportLostEgg(ctx, next){
    
    let playerId = ctx.params['playerId'];
    
    let playerLocation = ctx.params['playerLocation'];

    if(!!eggLocationsMap[playerLocation]){
    
        ctx.body = await saveLostEggData(playerId);
    
    } else {
        ctx.body = {error: "There's no egg here. You lie like a fly with sandwhich in its eye"};
    }
}

async function saveLostEggData(playerId){ 
    try{

        var database = await databasePromise;
        var currentPoints = (await database.get(`SELECT * FROM player_scores WHERE playerId = ?`, playerId)).points;
        var incrementedPoints = currentPoints + 1;
        await database.exec(`
            UPDATE player_scores
            SET points = `+incrementedPoints+`
            WHERE
                playerId = '`+playerId+`'
        `);
        console.log(await database.all(`select * from player_scores`));
        return {points: incrementedPoints};

    }catch(e){
        console.error(e);
        return {error: "points not updated"}
    }
}

module.exports = reportLostEgg;