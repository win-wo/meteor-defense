

var manifest;
var soundManifest;

function loadAssets(preload) {
    manifest = [
                        { src: "Assets/bg.png", id: "bg" },

                        { src: "Assets/base.png", id: "base" },
                        { src: "Assets/basebroken.png", id: "basebroken" },
                        { src: "Assets/city.png", id: "city" },
                        { src: "Assets/citybroken.png", id: "citybroken" },
                        { src: "Assets/meteor.png", id: "meteor" },
                        { src: "Assets/missile.png", id: "missile" },
                        { src: "Assets/pointer.png", id: "pointer" },

                        { src: "Assets/particlegray.png", id: "gray" },
                        { src: "Assets/particlered.png", id: "red" },
                        { src: "Assets/particleyellow.png", id: "yellow" },
                       
                        { src: "Assets/instruction.png", id: "inst" },
                        { src: "Assets/pause.png", id: "pause" }

    ];
    preload.loadManifest(manifest);
    /*
    soundManifest = [
                       { src: "Assets/wall.mp3", id: "wall" }
    ];
    createjs.Sound.registerManifest(soundManifest);
    */

}


// Graphics // 
var bg;

var PgrayBmap;
var PredBmap;
var PyellowBmap;
var instructionBmap;
var pauseBmap;
var baseBmap;
var baseBrokenBmap;
var cityBmap;
var cityBrokenBmap;
var meteorBmap;
var missileBmap;
var pointerBmap;
function prepareAssets(preload) {   
    bg = preload.getResult("bg").result;



    baseBmap = preload.getResult("base").result;
    baseBrokenBmap = preload.getResult("basebroken").result;
    cityBmap = preload.getResult("city").result;
    cityBrokenBmap = preload.getResult("citybroken").result;
    meteorBmap = preload.getResult("meteor").result;
    missileBmap = preload.getResult("missile").result;
    pointerBmap = preload.getResult("pointer").result;

    PgrayBmap = preload.getResult("gray").result;
    PredBmap = preload.getResult("red").result;
    PyellowBmap = preload.getResult("yellow").result;
  
   
    instructionBmap = preload.getResult("inst").result;
    pauseBmap = preload.getResult("pause").result;
}