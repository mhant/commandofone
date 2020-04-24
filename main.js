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
    start() {
        this.canvas = document.getElementById("gboard");
        this.canvas.width = 480;
        this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    }
    clear(){
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
    draw(){
        let ctx = gBoard.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function accelerate(direction) {
    if (direction === 1) {
        pieces.push(new Ship(0, 0, ShipType.CRUSER));
    }
    if (direction === 2) {
        pieces.push(new Ship(0, 100, ShipType.CORVETTE));
    }
}


function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    gBoard.clear();
    gBoard.frameNo += 1;
    for (i = 0; i < pieces.length; i += 1) {
        pieces[i].x += 1;
        pieces[i].draw(gBoard.context);
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}
