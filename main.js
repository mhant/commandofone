var gController;

function startGame() {
    let playerPlace = { "x": 100, "y": 100 };
    let enemyTypesPlaces = randomEnemies();
    let gatePlace = { "x": (getWidth() - 100), "y": ((getHeight() - 75) / 2) }
    gController = new GameController(playerPlace, enemyTypesPlaces, gatePlace, finishCallback);
}

function finishCallback(state) {
    if (state === LevelEndState.WIN) {
        alert("WIN");
    }
    else {
        alert("LOSE");
    }
    startGame();
}

function randomEnemies() {
    var enemyTypesPlaces = [];
    let width = getWidth() - 50;
    let height = getHeight() - 75;
    //random amount between 5 and 7
    let count = Math.floor(Math.random() * 3) + 5;
    for (var i = 0; i < count; i++) {
        let shipType = (Math.floor(Math.random() * 2)) > 0 ? ShipType.CRUSER : ShipType.CORVETTE;
        // get random X between 200 and width of screen - 200
        let x = width - 400 - (i * 200);
        let minY = 100;
        let maxY = height - 100;
        // alternating directions
        if (i % 2 === 0) {
            enemyTypesPlaces.push(
                {
                    "x": x, "y": minY, "shipType": shipType, "route":
                        [{ "x": x, "y": maxY }, { "x": x, "y": minY }]
                }
            );
        }
        else {
            enemyTypesPlaces.push(
                {
                    "x": x, "y": maxY, "shipType": shipType, "route":
                        [{ "x": x, "y": minY }, { "x": x, "y": maxY }]
                }
            );
        }
    }
    return enemyTypesPlaces;
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
