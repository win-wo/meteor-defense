


function createGameObj(Bitmap, scaleX, scaleY) {
    var gameObj = new createjs.Bitmap(Bitmap);
 
    gameObj.height = Bitmap.height;
    gameObj.width = Bitmap.width;
    gameObj.scaleX = scaleX;
    gameObj.scaleY = scaleY;
    gameObj.velX = 0;
    gameObj.velY = 0;
    gameObj.acelX = 0;
    gameObj.acelY = 0;
    gameObj.idle = 0;//added for target hunt
   
    return gameObj;
}




function getDistance(r1, r2) {
    var distance = 0;
    distance = Math.sqrt(Math.pow(((r1.x + r1.width * r1.scaleX / 2) - r2.x), 2) + Math.pow((r1.y + r1.height * r1.scaleY / 2 - r2.y), 2));
    return distance;
}

function collision(obj1, obj2) {
    if (obj1.x + obj1.width * obj1.scaleX < obj2.x) { return false; }
    if (obj1.x > obj2.x + obj2.width * obj2.scaleX) { return false; }
    if (obj1.y + obj1.height * obj1.scaleY < obj2.y) { return false; }
    if (obj1.y > obj2.y + obj2.height * obj2.scaleY) { return false; }
    return true;
}

function getAngleRad(obj1, obj2) {
    var radians = Math.atan2((obj1.y + obj1.height * obj1.scaleY / 2) - (obj2.y + obj2.height * obj2.scaleY / 2), (obj1.x + obj1.width * obj1.scaleX / 2) - (obj2.x + obj2.width * obj2.scaleX / 2));
    //var angle = radians * (180 / Math.PI);
   // radians = (angle) * (Math.PI / 180);
    return radians;
}


function updateObjLocation(obj) {
    obj.x += obj.velX;
    obj.y += obj.velY;
    obj.velX += obj.acelX;
    obj.velY += obj.acelY;
}

function createMouseObj(mouseX, mouseY) {
    var mouse = new Object();
    mouse.x = mouseX;
    mouse.y = mouseY;
    mouse.height = 0;
    mouse.width = 0;
    mouse.scaleX = 1;
    mouse.scaleY = 1;
    return mouse
}