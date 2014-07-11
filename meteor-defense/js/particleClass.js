/*
to setup

setupParticles(stage); // to prepare the particles
updateParticles() // in update loop to update particle position

*/

var particleCircularArray = 0;
var particleArray = new Array();
var totalParticle = 200;//total particles on screen
//var particleTime = 30;// time before it disappear

function setupParticles(stage) {
    while (totalParticle > particleArray.length) {
        var num = Math.floor(Math.random() * 3);
        var gameobj;
        switch (num) {
            case 0:
                gameobj = createGameObj(PyellowBmap, .2, .2);
                gameobj.y = -200;
                gameobj.x = -200;
                stage.addChild(gameobj);
                particleArray.push(gameobj);
                break;
            case 1:
                gameobj = createGameObj(PgrayBmap, .2, .2);
                gameobj.y = -200;
                gameobj.x = -200;
                stage.addChild(gameobj);
                particleArray.push(gameobj);
                break;
            case 2:
                gameobj = createGameObj(PredBmap, .2, .2);
                gameobj.y = -200;
                gameobj.x = -200;
                stage.addChild(gameobj);
                particleArray.push(gameobj);
                break;
            default:
                break;
        }
              
    }    
}

function setParticle(x, y, velX, velY, particleTime) {
    particleArray[particleCircularArray].idle = particleTime;
    particleArray[particleCircularArray].x = x;
    particleArray[particleCircularArray].y = y;
    particleArray[particleCircularArray].velX = velX;
    particleArray[particleCircularArray].velY = velY;
    particleArray[particleCircularArray].acelX = 0;
    particleArray[particleCircularArray].acelY = 0;
    particleCircularArray++;
    if (particleCircularArray >= particleArray.length) {
        particleCircularArray = 0;
    }
}

function setParticleAcel(x, y, velX, velY,acelX,acelY, particleTime) {
    particleArray[particleCircularArray].idle = particleTime;
    particleArray[particleCircularArray].x = x;
    particleArray[particleCircularArray].y = y;
    particleArray[particleCircularArray].velX = velX;
    particleArray[particleCircularArray].velY = velY;
    particleArray[particleCircularArray].acelX = acelX;
    particleArray[particleCircularArray].acelY = acelY;
    particleCircularArray++;
    if (particleCircularArray >= particleArray.length) {
        particleCircularArray = 0;
    }
}


function updateParticles() {
    for (var i = 0; i < particleArray.length ; ++i) {
        if (particleArray[i].idle > 0) {
            updateObjLocation(particleArray[i]);
            particleArray[i].idle--;
        } else {
            particleArray[i].x = -1000;
            particleArray[i].y = -1000;
            particleArray[i].velX = 0;
            particleArray[i].velY = 0;
            particleArray[i].acelX = 0;
            particleArray[i].acelY = 0;

        }
    }
}
function resetParticles() {
    for (var i = 0; i < particleArray.length; ++i) {
        particleArray[i].x = -1000;
        particleArray[i].y = -1000;
        particleArray[i].velX = 0;
        particleArray[i].velY = 0;
        particleArray[i].acelX = 0;
        particleArray[i].acelY = 0;
    }
}