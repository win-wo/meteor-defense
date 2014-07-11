// HTML5 Pong Game Template 
// Mickey MacDonald 2013
// 
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    var canvas; //Will be linked to the canvas in our default.html page
    var stage; //Is the equivalent of stage in AS3; we'll add "children" to it
  
    // Game States 
    var gameStates = {
        "Start": 1,
        "Playing": 2,
        "Pause": 3,
        "GameOver": 4,
    };

    var currentGameState; // Keeps track of our current game state


    var debugText;
    var lifeText;
    var instructionText;
    // Preloader 
    var preload;
    

    
    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
                initialize();
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    function initialize() {
        canvas = document.getElementById("gameCanvas"); // link our canvas to the one in default.html
        canvas.width = window.innerWidth; // Set the canvas width
        canvas.height = window.innerHeight; // Set the canvas height


        stage = new createjs.Stage(canvas); // This creates our stage on the canvas
     
        // Use PreloadJS to make sure sound & images are loaded
        // before we begin using them this is especially
        // important for large or remote resources
        preload = new createjs.PreloadJS();
        preload.onComplete = prepareGame;
        loadAssets(preload);
        
    }


    var instructionObj, pauseObj;
    var meteorArray = new Array();
    var missileArray = new Array();
    var base1;
    var base2;
    var base3;
    var basebroken1;
    var basebroken2;
    var basebroken3;
    var city1;
    var city2;
    var city3;
    var city4;
    var citybroken1;
    var citybroken2;
    var citybroken3;
    var citybroken4;

    var pointer;
    // This function will setup our game
    // This is where we assign our varibles and add objects to the stage
    var totalmissile = 100;
    var totalmeteor = 100;
    function prepareGame() {

        // Set the current state to 'Start'
        currentGameState = gameStates.Start;
        prepareAssets(preload);
        
        var background = createGameObj(bg, 1, 1);
        stage.addChild(background);
       
          

        setupParticles(stage);


        while (totalmeteor > meteorArray.length) {
            var gameobj = createGameObj(meteorBmap, .5, .5);
            gameobj.y = 100;
            gameobj.x = 100;
            stage.addChild(gameobj);
            meteorArray.push(gameobj);
        }
        while (totalmissile > missileArray.length) {
            var gameobj = createGameObj(missileBmap, .2, .2);
            gameobj.y = 200;
            gameobj.x = 200;
            stage.addChild(gameobj);
            missileArray.push(gameobj);
        }

        basebroken1 = createGameObj(baseBrokenBmap, .5, .5);
        basebroken1.y = canvas.height - basebroken1.height * basebroken1.scaleY ;// canvas.height / 2 - playerObj.height * playerObj.scaleX / 2;
        basebroken1.x = canvas.width * 2 / 8 - basebroken1.width * basebroken1.scaleX / 2;// canvas.width / 2 - playerObj.width * playerObj.scaleY / 2;
        stage.addChild(basebroken1);
        basebroken2 = createGameObj(baseBrokenBmap, .5, .5);
        basebroken2.y = canvas.height - basebroken2.height * basebroken2.scaleY ;// canvas.height / 2 - playerObj.height * playerObj.scaleX / 2;
        basebroken2.x = canvas.width * 4 / 8 - basebroken2.width * basebroken2.scaleX / 2;// canvas.width / 2 - playerObj.width * playerObj.scaleY / 2;
        stage.addChild(basebroken2);
        basebroken3 = createGameObj(baseBrokenBmap, .5, .5);
        basebroken3.y = canvas.height - basebroken3.height * basebroken3.scaleY ;// canvas.height / 2 - playerObj.height * playerObj.scaleX / 2;
        basebroken3.x = canvas.width * 6 / 8 - basebroken3.width * basebroken3.scaleX / 2;// canvas.width / 2 - playerObj.width * playerObj.scaleY / 2;
        stage.addChild(basebroken3);

        citybroken1 = createGameObj(cityBrokenBmap, .5, .5);
        citybroken1.y = canvas.height - citybroken1.height * citybroken1.scaleY ;// canvas.height / 2 - playerObj.height * playerObj.scaleX / 2;
        citybroken1.x = canvas.width * 1 / 8 - citybroken1.width * citybroken1.scaleX / 2;// canvas.width / 2 - playerObj.width * playerObj.scaleY / 2;
        stage.addChild(citybroken1);
        citybroken2 = createGameObj(cityBrokenBmap, .5, .5);
        citybroken2.y = canvas.height - citybroken2.height * citybroken2.scaleY ;// canvas.height / 2 - playerObj.height * playerObj.scaleX / 2;
        citybroken2.x = canvas.width * 3 / 8 - citybroken2.width * citybroken2.scaleX / 2;// canvas.width / 2 - playerObj.width * playerObj.scaleY / 2;
        stage.addChild(citybroken2);
        citybroken3 = createGameObj(cityBrokenBmap, .5, .5);
        citybroken3.y = canvas.height - citybroken3.height * citybroken3.scaleY;// canvas.height / 2 - playerObj.height * playerObj.scaleX / 2;
        citybroken3.x = canvas.width * 5 / 8 - citybroken3.width * citybroken3.scaleX / 2;// canvas.width / 2 - playerObj.width * playerObj.scaleY / 2;
        stage.addChild(citybroken3);
        citybroken4 = createGameObj(cityBrokenBmap, .5, .5);
        citybroken4.y = canvas.height - citybroken4.height * citybroken4.scaleY ;// canvas.height / 2 - playerObj.height * playerObj.scaleX / 2;
        citybroken4.x = canvas.width * 7 / 8 - citybroken4.width * citybroken4.scaleX / 2;// canvas.width / 2 - playerObj.width * playerObj.scaleY / 2;
        stage.addChild(citybroken4);

        base1 = createGameObj(baseBmap, .5, .5);
        base1.y = canvas.height - base1.height * base1.scaleY;// canvas.height / 2 - playerObj.height * playerObj.scaleX / 2;
        base1.x = -1000;//canvas.width * 2 / 8 - base1.width * base1.scaleX/2;// canvas.width / 2 - playerObj.width * playerObj.scaleY / 2;
        stage.addChild(base1);
        base2 = createGameObj(baseBmap, .5, .5);
        base2.y = canvas.height - base2.height * base2.scaleY ;// canvas.height / 2 - playerObj.height * playerObj.scaleX / 2;
        base2.x = -1000;//canvas.width * 4 / 8 - base2.width * base2.scaleX / 2;// canvas.width / 2 - playerObj.width * playerObj.scaleY / 2;
        stage.addChild(base2);
        base3 = createGameObj(baseBmap, .5, .5);
        base3.y = canvas.height - base3.height * base3.scaleY ;// canvas.height / 2 - playerObj.height * playerObj.scaleX / 2;
        base3.x = -1000;//canvas.width * 6 / 8 - base3.width * base3.scaleX / 2;// canvas.width / 2 - playerObj.width * playerObj.scaleY / 2;
        stage.addChild(base3);

        city1 = createGameObj(cityBmap, .5, .5);
        city1.y = canvas.height - city1.height * city1.scaleY;// canvas.height / 2 - playerObj.height * playerObj.scaleX / 2;
        city1.x = -1000;//canvas.width * 1 / 8  -city1.width * city1.scaleX / 2;// canvas.width / 2 - playerObj.width * playerObj.scaleY / 2;
        stage.addChild(city1);
        city2 = createGameObj(cityBmap, .5, .5);
        city2.y = canvas.height - city2.height * city2.scaleY;// canvas.height / 2 - playerObj.height * playerObj.scaleX / 2;
        city2.x = -1000;//canvas.width * 3 / 8 - city2.width * city2.scaleX / 2;// canvas.width / 2 - playerObj.width * playerObj.scaleY / 2;
        stage.addChild(city2);
        city3 = createGameObj(cityBmap, .5, .5);
        city3.y = canvas.height - city3.height * city3.scaleY ;// canvas.height / 2 - playerObj.height * playerObj.scaleX / 2;
        city3.x = -1000;//canvas.width * 5 / 8 - city3.width * city3.scaleX / 2;// canvas.width / 2 - playerObj.width * playerObj.scaleY / 2;
        stage.addChild(city3);
        city4 = createGameObj(cityBmap, .5, .5);
        city4.y = canvas.height - city4.height * city4.scaleY;// canvas.height / 2 - playerObj.height * playerObj.scaleX / 2;
        city4.x = -1000;//canvas.width * 7 / 8 - city4.width * city4.scaleX / 2;// canvas.width / 2 - playerObj.width * playerObj.scaleY / 2;
        stage.addChild(city4);
       
        pointer = createGameObj(pointerBmap, .3, .3);
        pointer.y = base1.y - pointer.height * pointer.scaleY;
        pointer.x = -1000;
        stage.addChild(pointer);
        debugText = new createjs.Text("Score:", 'bold 40px Arial', '#FFFFFF');
        stage.addChild(debugText);
       

        lifeText = new createjs.Text("Ammo:", 'bold 40px Arial', '#FFFFFF');
        lifeText.x = canvas.width*2/3;

        stage.addChild(lifeText);
        instructionText = new createjs.Text("", 'bold 20px Arial', '#FFFFFF');
        stage.addChild(instructionText);
        instructionText.y = canvas.height - 50;
      
      
        instructionObj = createGameObj(instructionBmap, 1, 1);
        instructionObj.y = -10000;
        instructionObj.x = 0;
        stage.addChild(instructionObj);


        stage.update();

        
        startGame(); // Run our startGame function
    }


    function startGame() {
        createjs.Ticker.setFPS(60); // Set the tick rate of our update timer
        createjs.Ticker.addListener(gameLoop); // Add a listener to call our gameloop on every tick
        addMouseEvent(stage);
    }

   
    var currentViewState;
    function gameLoop() {
        //manage the different view
        currentViewState = Windows.UI.ViewManagement.ApplicationView.value;
        if (currentViewState == Windows.UI.ViewManagement.ApplicationViewState.fullScreenLandscape) {
            canvas.width = window.innerWidth; // Set the canvas dimension
            canvas.height = window.innerHeight;
          
        } else {
            if (currentGameState == gameStates.Playing) {
                currentGameState = gameStates.Pause;//to pause
            }
        }
        update();
        draw();
        MouseTick();
    }
    function update() {
        inGame();
    }
    function draw() {        
        stage.update();    
    }

    
   
    function inGame() {
        //manage in game state
       
        if (currentGameState == gameStates.Start) {
            
            setupState();
            instructionObj.visible = true;
            if (isdown) {
                currentGameState = gameStates.Playing;
            }
        }
        if (currentGameState == gameStates.Playing) {
            mainGame();
            instructionObj.visible = false;
        }
        if (currentGameState == gameStates.Pause) {
            instructionObj.visible = true;
            if (isdown) {
                currentGameState = gameStates.Playing;
            }
        }
        if (currentGameState == gameStates.GameOver) {

        }

      
        //var mouseObj = createMouseObj(stage.mouseX, stage.mouseY);
       
    }

    
    function setupState() {
        resetParticles();      
        score = 0;
        instructionObj.y = canvas.height / 2 - instructionObj.height * instructionObj.scaleY/2;
        instructionObj.x = canvas.width / 2 - instructionObj.width * instructionObj.scaleX / 2;

        
            for(var i =0 ; i <   meteorArray.length; ++i){
                meteorArray[i].y = -1000;
                meteorArray[i].x = -1000;
                meteorArray[i].velX = 0;
                meteorArray[i].velY = 0;
                meteorArray[i].idle = 0;
            }
   
            for (var i = 0 ; i < missileArray.length; ++i) {
                missileArray[i].y = -2000;
                missileArray[i].x = -1000;
                missileArray[i].velX = 0;
                missileArray[i].velY = 0;
                missileArray[i].idle = 0;
            }
       
            base1.y = canvas.height - base1.height * base1.scaleY ;
            base1.x = canvas.width * 2 / 8 - base1.width * base1.scaleX/2;
            base2.y = canvas.height - base2.height * base2.scaleY ;
            base2.x = canvas.width * 4 / 8 - base2.width * base2.scaleX / 2;
            base3.y = canvas.height - base3.height * base3.scaleY;
            base3.x = canvas.width * 6 / 8 - base3.width * base3.scaleX / 2;
        
            city1.y = canvas.height - city1.height * city1.scaleY ;
            city1.x = canvas.width * 1 / 8 - city1.width * city1.scaleX / 2;
            city2.y = canvas.height - city2.height * city2.scaleY ;
            city2.x = canvas.width * 3 / 8 - city2.width * city2.scaleX / 2;
            city3.y = canvas.height - city3.height * city3.scaleY ;
            city3.x = canvas.width * 5 / 8 - city3.width * city3.scaleX / 2;// canvas.width / 2 - playerObj.width * playerObj.scaleY / 2;
            city4.y = canvas.height - city4.height * city4.scaleY ;// canvas.height / 2 - playerObj.height * playerObj.scaleX / 2;
            city4.x = canvas.width * 7 / 8 - city4.width * city4.scaleX / 2;// canvas.width / 2 - playerObj.width * playerObj.scaleY / 2;
       
             dead1 = false;
             dead2 = false;
             dead3 = false;
             dead4 = false;
             dead5 = false;
             dead6 = false;
             dead7 = false;
            numberOfMeteor=5;
    }
    var score = 0;
    var health = 10000;
    var i = 0;
    var timer = 0;
    var spawn = true;

    var dead1 = false;
    var dead2 = false;
    var dead3 = false;
    var dead4 = false;
    var dead5 = false;
    var dead6 = false;
    var dead7 = false;

    var numberOfMeteor = 5;
    var smokeTimer = 0;
    var smokeTimerMax = 2;
    var pointerLoc = 0;
    var ammoMax = 15;
    var ammo = 5;
    var MissleCircularArrayIndex = 0;
    var missileSpeed = 6;
    function mainGame() {
        var mouseObj = createMouseObj(stage.mouseX, stage.mouseY);

        

        timer++;
        if (timer > 480) {
            timer = 0;
            numberOfMeteor++;
        }
        if (smokeTimerMax < smokeTimer) {
            smokeTimer = 0;
            if (dead1) {
                setParticle(citybroken1.x + Math.random() * citybroken1.width * citybroken1.scaleX, citybroken1.y + citybroken1.height * citybroken1.scaleY - 30, 0, -3, Math.random() * 25 + 15);
            }
            if (dead2) {
                setParticle(basebroken1.x + Math.random() * basebroken1.width * basebroken1.scaleX, basebroken1.y + basebroken1.height * basebroken1.scaleY - 30, 0, -3, Math.random() * 25 + 15);
            }
            if (dead3) {
                setParticle(citybroken2.x + Math.random() * citybroken2.width * citybroken2.scaleX, citybroken2.y + citybroken2.height * citybroken2.scaleY - 30, 0, -3, Math.random() * 25 + 15);
            }
            if (dead4) {
                setParticle(basebroken2.x + Math.random() * basebroken2.width * basebroken2.scaleX, basebroken2.y + basebroken2.height * basebroken2.scaleY - 30, 0, -3, Math.random() * 25 + 15);
            }
            if (dead5) {
                setParticle(citybroken3.x + Math.random() * citybroken3.width * citybroken3.scaleX, citybroken3.y + citybroken3.height * citybroken3.scaleY - 30, 0, -3, Math.random() * 25 + 15);
            }
            if (dead6) {
                setParticle(basebroken3.x + Math.random() * basebroken3.width * basebroken3.scaleX, basebroken3.y + basebroken3.height * basebroken3.scaleY - 30, 0, -3, Math.random() * 25 + 15);
            }
            if (dead7) {
                setParticle(citybroken4.x + Math.random() * citybroken4.width * citybroken4.scaleX, citybroken4.y + citybroken4.height * citybroken4.scaleY - 30, 0, -3, Math.random() * 25 + 15);
            }
        }
        smokeTimer++;
        for (var i = 0 ; i < meteorArray.length && i < numberOfMeteor ; i++) {
            if (meteorArray[i].idle <= 0) {
                for (var j = 0; j < 30 ; j++) {
                    setParticleAcel(meteorArray[i].x + Math.random() * meteorArray[i].width * meteorArray[i].scaleX, meteorArray[i].y + meteorArray[i].height * meteorArray[i].scaleY - 30, Math.random() * 20 - 10, Math.random() * 20 - 10, 0, 1, Math.random() * 20 + 5);
                }


                meteorArray[i].x = Math.random() * (canvas.width - meteorArray[i].width * meteorArray[i].scaleX);
                meteorArray[i].y = -meteorArray[i].height * meteorArray[i].scaleY- canvas.height*Math.random();
                meteorArray[i].velY = Math.random() * 2 + 1;
                meteorArray[i].idle = 1;
                //spawn
            } else {
                if (meteorArray[i].y + meteorArray[i].height * meteorArray[i].scaleY > canvas.height) { meteorArray[i].idle = 0; }
                updateObjLocation(meteorArray[i]);

                if (smokeTimer > smokeTimerMax) {
                    setParticle(meteorArray[i].x + Math.random() * meteorArray[i].width * meteorArray[i].scaleX, meteorArray[i].y + meteorArray[i].height * meteorArray[i].scaleY - 30, 0, -3, Math.random() * 20 + 5);
                }
                if (collision(meteorArray[i], city1)) { dead1 = true; city1.x = -1000; meteorArray[i].idle = 0; }
                if (collision(meteorArray[i], base1)) { dead2 = true; base1.x = -1000; meteorArray[i].idle = 0; }
                if (collision(meteorArray[i], city2)) { dead3 = true; city2.x = -1000; meteorArray[i].idle = 0; }
                if (collision(meteorArray[i], base2)) { dead4 = true; base2.x = -1000; meteorArray[i].idle = 0; }
                if (collision(meteorArray[i], city3)) { dead5 = true; city3.x = -1000; meteorArray[i].idle = 0; }
                if (collision(meteorArray[i], base3)) { dead6 = true; base3.x = -1000; meteorArray[i].idle = 0; }
                if (collision(meteorArray[i], city4)) { dead7 = true; city4.x = -1000; meteorArray[i].idle = 0; }
            
                for (var j = 0 ; j < missileArray.length ; j++) {
                    if(collision(missileArray[j],meteorArray[i])){
                    
                        meteorArray[i].idle = 0;
                        score++;
                        missileArray[j].x = -1000;
                        missileArray[j].velX = 0;
                        missileArray[j].velY = 0;
                    }
                }
            }
        }
        if (isPressed) {
            
            if (!(dead2 && dead4 && dead6) && ammo > 0) {
                //shoot bullet from pointer
                if (MissleCircularArrayIndex >= missileArray.length) {
                    MissleCircularArrayIndex = 0;
                }
                missileArray[MissleCircularArrayIndex].x = pointer.x;
                missileArray[MissleCircularArrayIndex].y = pointer.y;
                var missileAngle = getAngleRad(mouseObj, missileArray[MissleCircularArrayIndex]);
                missileArray[MissleCircularArrayIndex].velY = Math.sin(missileAngle) * missileSpeed;
                missileArray[MissleCircularArrayIndex].velX = Math.cos(missileAngle) * missileSpeed;
                MissleCircularArrayIndex++;
                ammo--;
            }
            pointerLoc++;
        }


       //bullet and meteor collision
        //missile update
        for (var i = 0 ; i < missileArray.length ; i++) {
            //collision
           
            //out of bound
            if (missileArray[i].x > canvas.width) {
                missileArray[i].x = -1000;
                missileArray[i].velX = 0;
                missileArray[i].velY = 0;
            }
            if (missileArray[i].x + missileArray[i].width * missileArray[i].scaleX < 0) {
                missileArray[i].x = -1000;
                missileArray[i].velX = 0;
                missileArray[i].velY = 0;
            }
            if (missileArray[i].y > canvas.height) {
                missileArray[i].x = -1000;
                missileArray[i].velX = 0;
                missileArray[i].velY = 0;
            }
            if (missileArray[i].x + missileArray[i].width * missileArray[i].scaleX < 0) {
                missileArray[i].x = -1000;
                missileArray[i].velX = 0;
                missileArray[i].velY = 0;
            }
            updateObjLocation(missileArray[i]);
        }

        if (!(dead2 && dead4 && dead6)) {
           
            var fixing = true;
            while (fixing) {
                if (pointerLoc == 0 && !dead2) {
                    pointer.x = base1.x + base1.width * base1.scaleX / 2 - pointer.width * pointer.scaleX / 2;
                    fixing = false;
                }
                if (pointerLoc == 0 && dead2) { pointerLoc++; }

                if (pointerLoc == 1 && !dead4) {
                    pointer.x = base2.x + base2.width * base2.scaleX / 2 - pointer.width * pointer.scaleX / 2;
                    fixing = false;
                }
                if (pointerLoc == 1 && dead4) { pointerLoc++; }

                if (pointerLoc == 2 && !dead6) {
                    pointer.x = base3.x + base3.width * base3.scaleX / 2 - pointer.width * pointer.scaleX / 2;
                    fixing = false;
                }
                if (pointerLoc == 2 && dead6) { pointerLoc++; }

            
                if (pointerLoc > 2) { pointerLoc = 0; }
            }
        } else {
            pointer.x = -1000;
        }

        //hit test missile & hitting score
      // pointer setup and ammo regen

        //dead
        if (dead1 && dead2 && dead3 && dead4 && dead5 && dead6 && dead6) { currentGameState = gameStates.Start; }

        //score
        if (scoreTimerMax < scoreTimer) {
            scoreTimer = 0;
            if (!dead1) {
                score += 5;
            }
            if (!dead2) {
                score += 1;
                if (ammo < ammoMax) {
                    ammo++;
                }
            }
            if (!dead3) {
                score += 5;
            }
            if (!dead4) {
                score += 1;
                if (ammo < ammoMax) {
                    ammo++;
                }
            }
            if (!dead5) {
                score += 5;
            }
            if (!dead6) {
                score += 1;
                if (ammo < ammoMax) {
                    ammo++;
                }
            }
            if (!dead7) {
                score += 5;
            }
        }
        scoreTimer++;
        debugText.text = "Score:" + score;        
        lifeText.text = "Ammo:" + ammo;
        updateParticles();
       
        
    }
    var scoreTimer = 0;
    var scoreTimerMax = 120;




    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    document.addEventListener("DOMContentLoaded", initialize, false);

    app.start();
})();
