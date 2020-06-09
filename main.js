var gController;
var introController;
var menuController;

function intro() {
    introController = new HowToController(menu);
}

function menu(){
    menuController = new MenuController();
}

function startGame(level) {
    // ensure that width is at least 600 for at least one enemy
    if (getWidth() < 600) {
        alert("Please enlarge browser to at least 600px width and refresh page.");
        return;
    }
    // var randGame = getRandomeGame();
    var randGame = parseLevel(level);
    // add callback function
    var t = this;
    randGame.push(t.finishCallback);
    // need to add null as first arg
    randGame.unshift(null);
    gController = new (Function.prototype.bind.apply(GameController, randGame));
    window.onresize = function (event) {
        // if not already ended, end game
        if (!gController.gameOver) {
            gController.end();
            alert("Do not resize during game, please refresh.");
        }
    }
}

function finishCallback(state) {
    if (state === LevelEndState.WIN) {
        alert("WIN");
    }
    else {
        alert("LOSE");
    }
    menu();
}

function relativeToGate() {
    let gatePlace = { "x": (getWidth() - 100), "y": ((getHeight() - 75) / 2) };
    let start = getPointRelativeTo(-300, -100, gatePlace);
    let second = getPointRelativeTo(-200, -200, gatePlace);
    let third = getPointRelativeTo(-400, 200, gatePlace);
    return {
        "x": start.x, "y": start.y, "shipType": ShipType.CRUSER, "route":
            [
                { "x": second.x, "y": second.y },
                { "x": third.x, "y": third.y },
                { "x": start.x, "y": start.y }
            ]
    };
}
function turnDirection() {
    let x = getWidth() - 600;
    let y = ((getHeight() - 75) / 2);
    return {
        "x": x, "y": y, "shipType": ShipType.CRUSER, "route":
            getTurnRoute({ "x": x, "y": y }, Math.PI / 4, ShipType.CRUSER, Math.PI / 2)
    };
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

// convert negative radians to positive, or over 2pi to within 0-2pi
function rad2Pos(rad) {
    if (rad < 0) {
        return rad2Pos(rad + 2 * Math.PI);
    }
    else if (rad > 2 * Math.PI) {
        return rad2Pos(rad - 2 * Math.PI);
    }
    return rad;
}
// gets a point relative to other object
function getPointRelativeTo(distX, distY, point) {
    if (!("x" in point) || !("y" in point)) {
        throw Error("Invalid point, needs 'x' and 'y'.");
    }
    return { "x": (distX + point.x), "y": (distY + point.y) };
}
// build route from point with turn of turnRad left & right for shipType
function getTurnRoute(point, turnRad, shipType, direction = 0) {
    let radius = ((shipType === ShipType.CORVETTE) ? 10 : 5) / 2;
    // get center of ship for turn, assuming default direction of 0 rad
    let cX = point.x - radius;
    let cY = point.y;
    let x1 = cX + (radius * Math.cos(direction + turnRad));
    let y1 = cY + (radius * Math.sin(direction + turnRad));
    let x2 = cX + (radius * Math.cos(direction + (2 * turnRad)));
    let y2 = cY + (radius * Math.sin(direction + (2 * turnRad)));
    return [{ "x": x1, "y": y1 }, { "x": x2, "y": y2 }];
}
