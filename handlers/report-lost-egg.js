'use strict'
const databasePromise = require('../config/sqlite');
const eggLocations = require('../resources/egg-locations');
const eggLocationsMap = require('../resources/egg-locations');


async function reportLostEgg(ctx, next){
    
    let playerId = ctx.params['playerId'];
    
    let playerLocation = ctx.params['playerLocation'];

    if(!!eggLocationsMap[playerLocation]){
    
        ctx.body = await saveLostEggData(playerId, playerLocation);
    
    } else {
        ctx.body = {error: "There's no egg here. You lie like a fly with sandwhich in its eye"};
    }
}

async function saveLostEggData(playerId, playerLocation){ 
    var response = {error: 'nothing happened'};

    try{
        
        var database = await databasePromise;
        var playerData = (await database.get(`SELECT * FROM player_scores WHERE playerId = ?`, playerId));
        var currentPoints = playerData.points;
        var reportedEggsMap = JSON.parse(playerData.reportedEggs);

        if(!!reportedEggsMap[playerLocation]){
            response = {points: currentPoints};
        } else {
            reportedEggsMap[playerLocation] = true;
            var incrementedPoints = currentPoints + 1;
            await database.exec(`
                UPDATE player_scores
                    SET points = `+incrementedPoints+`,
                        reportedEggs = '`+JSON.stringify(reportedEggsMap)+`'
                WHERE
                    playerId = '`+playerId+`'
            `);
            console.log(await database.all(`select * from player_scores`));
            response = {points: incrementedPoints};
        }

    }catch(e){
        console.error(e);
        response = {error: "points not updated"};
    } finally {
        return response;
    }
}

module.exports = reportLostEgg;