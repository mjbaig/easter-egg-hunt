'use strict'

const distanceRadiusThreshold = 1;

const EGGLOCATIONS = [
    {x:1,y:2,z:3},
    {x:3,y:4,z:7}
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