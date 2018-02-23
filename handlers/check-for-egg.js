'use strict'

const databasePromise = require('../config/sqlite');
const playerWithinEggThreshold = require('../serious-business-logic/player-within-egg-location-threshold');

async function checkForEgg(ctx, next){

    let playerId = ctx.params['playerId'];

    let playerLocation = ctx.params['playerLocation'];
    let playerXLocation = Number(playerLocation.split(',')[0]);
    let playerYLocation = Number(playerLocation.split(',')[1]);
    let playerZLocation = Number(playerLocation.split(',')[2]);

    let database = await databasePromise;
    var playerData = (await database.get(`SELECT * FROM player_scores WHERE playerId = ?`, playerId));
    console.log(playerData);
    var foundEggs = JSON.parse(playerData['foundEggs']);

    if(!foundEggs){
        foundEggs = {}
    }

    if(playerWithinEggThreshold(playerXLocation, playerYLocation, playerZLocation) && !foundEggs[playerLocation]){
        ctx.body = {playerIsInEggLocation: true};
        foundEggs[playerLocation] = true;
        await database.exec(`
            UPDATE player_scores
                SET foundEggs = '`+JSON.stringify(foundEggs)+`'
            WHERE
                playerId = '`+playerId+`'
        `);
    } else {
        ctx.body = {playerIsInEggLocation: false};
    }

}

module.exports = checkForEgg;