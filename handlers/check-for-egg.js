'use strict'

const eggLocationsMap = require('../resources/egg-locations');

async function checkForEgg(ctx, next){
    
    let playerLocation = ctx.params['playerLocation'];

    if(!!eggLocationsMap[playerLocation]){
        ctx.body = {playerIsInEggLocation: true};
    } else {
        ctx.body = {playerIsInEggLocation: false};
    }

}

module.exports = checkForEgg;