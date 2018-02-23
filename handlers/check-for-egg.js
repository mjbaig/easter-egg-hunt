'use strict'

const playerWithinEggThreshold = require('../serious-business-logic/player-within-egg-location-threshold');

async function checkForEgg(ctx, next){
    
    let playerLocation = ctx.params['playerLocation'];
    console.log(playerLocation)
    let playerXLocation = Number(playerLocation.split(',')[0]);
    let playerYLocation = Number(playerLocation.split(',')[1]);
    let playerZLocation = Number(playerLocation.split(',')[2]);

    if(playerWithinEggThreshold(playerXLocation, playerYLocation, playerZLocation)){
        ctx.body = {playerIsInEggLocation: true};
    } else {
        ctx.body = {playerIsInEggLocation: false};
    }

}

module.exports = checkForEgg;