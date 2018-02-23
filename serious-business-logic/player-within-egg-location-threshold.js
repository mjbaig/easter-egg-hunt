'use strict'

const distanceRadiusThreshold = 2.4;

const EGGLOCATIONS = [
    {x:-.92,y:.022,z:.67},
    {x:-3,y:-.04,z:2.2}
]

function playerWithinAcceptableBounds(playerX,playerY,playerZ){

    let isWithinAcceptableBounds = false;

    EGGLOCATIONS.forEach(function(eggLocation){
        let eggX = eggLocation.x;
        let eggY = eggLocation.y;
        let eggZ = eggLocation.z;

        let eggDistanceX = (playerX - eggX)*(playerX - eggX);
        let eggDistanceY = (playerY - eggY)*(playerY - eggY);
        let eggDistanceZ = (playerZ - eggZ)*(playerZ - eggZ);


        if( (eggDistanceX+eggDistanceY+eggDistanceZ) <= (distanceRadiusThreshold^2)){
            isWithinAcceptableBounds = true;
        }

    });

    return isWithinAcceptableBounds;

}

module.exports = playerWithinAcceptableBounds;