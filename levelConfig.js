/**
 * Levels config array
 * Format of each item in array:
 *   1. name - name for the level
 *   2. playerPlace - place to start the player
 *   3. gatePlace - place to put the gate
 *   4. enemyTypesPlaces - list of enemies with type and place
 * Details:
 *   1. place are defined as {"x":x, "y":y}
 *   2. enemyTypesPlaces contains place, shipType (ShipType), and route (optional list of places)
 *   3. eval will be run on values, so can call functions like:
 *      a. getWidth, getHeight, getPointRelativeTo, ...
 *      b. evals run in order above so can access variables like 'playerPlace' in subsuquent items
 */
var levels = [
    {

    }
];
/**
 * parses level value according to details above
 * num = which number level (if doesn't exist throws error)
 * returns [playerPlace, enemyTypesPlaces, gateplace] object
 */
function parseLevel(num) {
    // check if that level exists
    if (num > levels.length) {
        throw Error("Invalid level.");
    }
    return parseConfig(levels[num]);
}

function parseConfig(config) {
    var playerPlace, gatePlace, enemyTypesPlaces;
    if (("playerPlace" in config)
        && validPlace(config.playerPlace)
    ) {
        playerPlace = {
            "x": eval(config.playerPlace.x),
            "y": eval(config.playerPlace.y)
        };
    }
    // otherwise default
    else {
        playerPlace = getDefaultPlayerPlace();
    }
    if (("gatePlace" in config)
        && validPlace(config.gatePlace)
    ) {
        gatePlace = {
            "x": eval(config.gatePlace.x),
            "y": eval(config.gatePlace.y)
        };
    }
    // otherwise default
    else {
        gatePlace = getDefaultGatePlace();
    }
    if ("enemyTypesPlace" in config) {
        // try and parse enemyTypesPlace
        enemyTypesPlaces =
            getEnemyTypesPlaceArray(config.enemyTypesPlaces);
    }
    if (enemyTypesPlaces === null) {
        enemyTypesPlaces = randomEnemies();
    }
    return [playerPlace, enemyTypesPlaces, gatePlace];
}

function getDefaultPlayerPlace() {
    return { "x": 100, "y": 100 };
}

function getDefaultGatePlace() {
    return {
        "x": (getWidth() - 100),
        "y": ((getHeight() - 75) / 2)
    };
}

function validPlace(item) {
    return ("x" in item) && ("y" in item);
}

function getEnemyTypesPlaceArray(enemyArr) {
    var retArray = [];
    if (!(enemyArr instanceof Array)) {
        return null;
    }
    for (var i = 0; i < enemyArr.length; i++) {
        if (!validPlace(enemyArr[i])
            || !("shipType" in enemyArr[i])) {
            return null;
        }
        // TODO parse item and add to retArray
    }
    return retArray;
}

// Randomized gameboard
function getRandomeGame() {
    let playerPlace = getDefaultPlayerPlace();
    let enemyTypesPlaces = randomEnemies();
    let gatePlace = getDefaultGatePlace();
    return [playerPlace, enemyTypesPlaces, gatePlace];
}

function randomEnemies() {
    var enemyTypesPlaces = [];
    let width = getWidth() - 50;
    let height = getHeight() - 75;
    //calculate how many enemies we can support
    let maxEnemies = Math.floor((width - 400) / 200);
    //random amount between 3 and 6
    var count = Math.floor(Math.random() * 4) + 3;
    // max random count of enemis for screen
    count = Math.min(count, maxEnemies);
    enemyTypesPlaces.push(relativeToGate());
    enemyTypesPlaces.push(turnDirection());
    for (var i = 2; i < count; i++) {
        let shipType = (Math.floor(Math.random() * 2)) > 0 ? ShipType.CRUSER : ShipType.CORVETTE;
        // get random X between 200 and width of screen - 200
        let x = width - 200 - (i * 200);
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