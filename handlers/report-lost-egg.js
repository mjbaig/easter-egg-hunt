'use strict'
const databasePromise = require('../config/sqlite');
const eggLocations = require('../resources/egg-locations');
const eggLocationsMap = require('../resources/egg-locations');
const playerWithinEggThreshold = require('../serious-business-logic/player-within-egg-location-threshold');


async function reportLostEgg(ctx, next){
    
    let playerId = ctx.params['playerId'];
    
    let playerLocation = ctx.params['playerLocation'];

    let playerXLocation = Number(playerLocation.split(',')[0]);
    let playerYLocation = Number(playerLocation.split(',')[1]);
    let playerZLocation = Number(playerLocation.split(',')[2]);

    if(playerWithinEggThreshold(playerXLocation, playerYLocation, playerZLocation)){
    
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