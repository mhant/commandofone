var pieces = [];
var myGamePiece;
var gBoard;

function startGame() {
    gBoard = new GameBoard();
    gBoard.start();
}

class GameBoard {
    #canvas
    #frameNo
    #interval
    leftAdjust
    topAdjust
    start() {
        this.canvas = document.getElementById("gboard");
        this.canvas.width = 480;
        this.canvas.height = 480;
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
}

function engage(x, y) {
    if (pieces.length > 0) {
        pieces[0].navigateTo(x, y);
    }
}

function clickHandler(event) {
    if (pieces.length > 0) {
        pieces[0].navigateTo(event.x - gBoard.leftAdjust, event.y - gBoard.topAdjust);
    }
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
