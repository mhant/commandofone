class LevelEndState {
    static WIN = 0;
    static LOSE = 1;
}

class GameController {
    // Objects on the gameboard
    //array of enemies
    #enemies
    //player ship
    #player
    //gate object
    #gate
    //array of missiles
    #missiles
    // Gameboard and other base drawing components
    #gameBoard

    //game interval mechanism
    #interval

    // callback handler for when game finishes
    #callbackHandler

    // game state
    #gameOver
    constructor(playerPlace, enemyTypesPlaces, gatePlace, callbackHandler) {
        // if invalid init values throw error
        if (!("x" in playerPlace) || !("y" in playerPlace) ||
            !(enemyTypesPlaces instanceof Array) ||
            !("x" in gatePlace) || !("y" in gatePlace)
        ) {
            throw Error("Invalid game piece setup config");
        }
        document.getElementById("gameboard").style.display = "block";
        this.callbackHandler = function(state){
            callbackHandler(state);
        };
        this.gameOver = false;
        // to keep class ref in callbacks
        var t = this;
        window.addEventListener('keydown', function (key) { t.keyPress(key); }, false);
        this.gameBoard = new GameBoardController();
        this.gameBoard.start();
        this.initPieces(playerPlace, enemyTypesPlaces, gatePlace);
        let range = document.getElementById("sheild");
        range.addEventListener("input", () => {
            t.setSliderHint(range);
            if (t.player) {
                t.player.setShields(parseInt(range.value));
            }
        });
        this.setSliderHint(range);
        if (t.player) {
            t.player.setShields(parseInt(range.value));
        }
        this.missiles = [];
        this.interval = setInterval(
            function () {
                t.updateGameArea();
            }
            , 20);
        this.gameBoard.canvas.addEventListener('click', function (event) { t.clickHandler(event) });
    }

    setSliderHint(range) {
        let val = parseInt(range.value);
        let dyno = document.querySelector('[data="dyno"]');
        switch (val) {
            case 1:
                dyno.innerHTML = ".slider { border-left: 5px solid #00B09D !important; border-right: 5px solid #2F4858 !important;}";
                break;
            case 2:
                dyno.innerHTML = ".slider { border-left: 5px solid #00B09D !important; border-right: 5px solid #00B09D !important;}";
                break;
            case 3:
                dyno.innerHTML = ".slider { border-left: 5px solid #2F4858 !important; border-right: 5px solid #00B09D !important;}";
                break;
        }

    }

    initPieces(playerPlace, enemyTypesPlaces, gatePlace) {
        this.player = new Ship(playerPlace.x, playerPlace.y, ShipType.STEALTH, 0, false);
        this.enemies = [];
        for (var i = 0; i < enemyTypesPlaces.length; i++) {
            var enemy = enemyTypesPlaces[i];
            this.enemies.push(new Ship(enemy.x, enemy.y, enemy.shipType, 0, true, enemy.route));
        }
        this.gate = new Gate(gatePlace.x, gatePlace.y);
    }

    updateGameArea() {
        // if in end state then do nothing
        if (this.gameOver) {
            return;
        }
        this.gameBoard.clear();
        //==== draw && update ==== 
        // enemies
        for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update();
            this.enemies[i].draw(this.gameBoard.context);
            // check detects
            if (this.enemies[i].detectShip(this.player)) {
                let newMissile = this.enemies[i].fireMissile(this.player);
                if (newMissile !== null) {
                    this.missiles.push(newMissile);
                }
            }
        }
        // player
        this.player.draw(this.gameBoard.context);
        this.player.update();
        // gate
        this.gate.draw(this.gameBoard.context);
        if (this.gate.collide(this.player.x, this.player.y)) {
            this.callbackHandler(LevelEndState.WIN);
            this.end();
        }
        // missiles
        for (var i = 0; i < this.missiles.length; i++) {
            this.missiles[i].update();
            this.missiles[i].draw(this.gameBoard.context);
            //==== check collision ====
            var hit = this.player.collide(this.missiles[i].x, this.missiles[i].y);
            if (hit > CollideState.MISS) {
                this.missiles.splice(i, 1);
                if (hit === CollideState.KILL) {
                    this.callbackHandler(LevelEndState.LOSE);
                    this.end();
                }
            }
        }
    }

    keyPress(key) {
        var range = 2;
        switch (key.keyCode) {
            //A
            case 65:
                //call back sheild
                range = 1;
                break;
            //S
            case 83:
                //call back sheild
                range = 2;
                break;
            //D
            case 68:
                //call front sheild
                range = 3
                break;
        }
        var slider = document.getElementById("sheild");
        slider.value = range;
        this.player.setShields(range);
        this.setSliderHint({"value":range});
    }

    clickHandler(event) {
        this.player.navigateTo(
            event.x - this.gameBoard.leftAdjust,
            event.y - this.gameBoard.topAdjust
        );
    }

    end() {
        clearInterval(this.interval);
        this.gameOver = true;
        document.getElementById("gameboard").style.display = "none";
        this.gameBoard.clear();
    }

}