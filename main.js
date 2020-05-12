var pieces = [];
var myGamePiece;
var gBoard;

function startGame() {
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
        this.canvas.width = getWidth() - 100;
        this.canvas.height = getHeight() - 200;
    }
}


class GamePiece {
    constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
    }
    draw() {
        let ctx = gBoard.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
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
        if (pieces[0].collide(x, y)) {
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
        // pieces[i].x += 1;
        pieces[i].update();
        pieces[i].draw(gBoard.context);
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
// convert negative radians to positive
function rad2Pos(rad) {
    if (rad < 0) {
        return rad + 2 * Math.PI;
    }
    else if (rad > 2 * Math.PI){
        return rad - 2 * Math.PI;
    }
    return rad;
}