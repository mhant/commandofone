var pieces = [];
var gBoard;

function startGame() {
    window.addEventListener('keydown', this.keyPress, false);
    gBoard = new GameBoard();
    gBoard.start();
    window.onresize = function (event) {
        gBoard.setSize();
    }
    let range = document.getElementById("sheild");
    range.addEventListener("input", () => {
        setSliderHint(range);
        if (pieces.length > 0) {
            pieces[0].setShields(parseInt(range.value));
        }
    });
    setSliderHint(range);
}

class GameBoard {
    #canvas
    #frameNo
    #interval
    leftAdjust
    topAdjust
    width
    height
    start() {
        this.canvas = document.getElementById("gboard");
        this.setSize();
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        this.canvas.addEventListener('click', clickHandler);
        this.leftAdjust = this.canvas.offsetLeft + this.canvas.clientLeft;
        this.topAdjust = this.canvas.offsetTop + this.canvas.clientTop;
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    setSize() {
        this.canvas.width = this.width = getWidth() - 50;
        this.canvas.height = this.height = getHeight() - 75;
    }
}

function createShip(shipType) {
    pieces.push(new Ship(100, shipType === ShipType.CRUSER ? 100 : 200, shipType, 0));
    // if first ship adjust sheild
    if (pieces.length == 1) {
        let range = document.getElementById("sheild");
        pieces[0].setShields(parseInt(range.value));
    }
}

function engage(x, y) {
    if (pieces.length > 0) {
        if (pieces[0].collide(x, y) === CollideState.KILL) {
            pieces.splice(0, 1);
        }
        else {
            pieces[0].navigateTo(x, y);
        }
    }
}

function clickHandler(event) {
    engage(event.x - gBoard.leftAdjust, event.y - gBoard.topAdjust);
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    gBoard.clear();
    gBoard.frameNo += 1;
    for (i = 0; i < pieces.length; i++) {
        pieces[i].update();
        pieces[i].draw(gBoard.context);
        //check collides and detectes
        for (j = 0; j < pieces.length; j++) {
            if (j === i) {
                continue;
            }
            // check collides
            if (
                (pieces[j] instanceof Missile)
                &&
                (pieces[i] instanceof Ship)
                &&
                (pieces[j].owner !== pieces[i])
            ) {
                var hit = pieces[i].collide(pieces[j].x, pieces[j].y);
                if (hit > CollideState.MISS) {
                    pieces.splice(j, 1);
                    if (hit === CollideState.KILL) {
                        pieces.splice(i, 1);
                    }
                }
            }
            // check reached gate
            if ((pieces[j] instanceof Gate) &&
                (pieces[i] instanceof Ship) && !pieces[i].enemy) {
                if (pieces[j].collide(pieces[i].x, pieces[i].y)) {
                    alert("Reached Gate");
                    pieces.splice(j, 1);
                }
            }
            // check detects
            if ((pieces[j] instanceof Ship) && pieces[j].enemy && (pieces[i] instanceof Ship)) {
                if (pieces[j].detectShip(pieces[i])) {
                    let newMissile = pieces[j].fireMissile(pieces[i]);
                    if (newMissile !== null) {
                        pieces.push(newMissile);
                    }
                }

            }
        }
    }

}

function createMissile() {
    if (pieces.length > 0 && pieces[0] instanceof Ship) {
        pieces.push(new Missile(0, 0, pieces[0]));
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}

function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

function getHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
}

function setSliderHint(range) {
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

function createGate() {
    if (pieces.length > 0 && pieces[0] instanceof Ship) {
        pieces.push(new Gate(gBoard.width - 50, gBoard.height / 2));
    }
}

// convert negative radians to positive
function rad2Pos(rad) {
    if (rad < 0) {
        return rad + 2 * Math.PI;
    }
    else if (rad > 2 * Math.PI) {
        return rad - 2 * Math.PI;
    }
    return rad;
}

function keyPress(key) {
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
    pieces[0].setShields(range);
    setSliderHint(range);
}