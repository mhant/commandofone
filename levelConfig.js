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
        "name": "The Chase",
        "playerPlace": { "x": 50, "y": "getHeight()/2" },
        "gatePlace": { "x": "getWidth()-100", "y": "getHeight()/2-GATE_HEIGHT/2" },
        "enemyTypesPlaces": [
            {
                "x": "playerPlace.x",
                "y": "playerPlace.y + 200",
                "shipType": ShipType.CRUSER,
                "route": [{
                    "x": "gatePlace.x - 100",
                    "y": "gatePlace.y + 25 + GATE_HEIGHT"
                }]
            },
            {
                "x": "playerPlace.x",
                "y": "playerPlace.y - 200",
                "shipType": ShipType.CRUSER,
                "route": [{
                    "x": "gatePlace.x - 100",
                    "y": "gatePlace.y - 25"
                }]
            }
        ]
    },
    {
        "name": "The Chase 2",
    },
    {
        "name": "The Chase 3",
    },
    {
        "name": "The Chase 4",
    },
    {
        "name": "The Chase 5",
    },
    {
        "name": "The Chase 6",
    },
    {
        "name": "The Chase 7",
    },
    {
        "name": "The Chase 8",
    },
    {
        "name": "The Chase 9",
    },
    {
        "name": "The Chase 10",
    },
    {
        "name": "The Chase 11",
    },
    {
        "name": "The Chase 12",
    },
    {
        "name": "The Chase 13",
    },
    {
        "name": "The Chase 14",
    },
    {
        "name": "The Chase 15",
    },
    {
        "name": "The Chase 16",
    },
    {
        "name": "The Chase 17",
    },
    {
        "name": "The Chase 18",
    },
    {
        "name": "The Chase 19",
    },
    {
        "name": "The Chase 20",
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
    if ("enemyTypesPlaces" in config) {
        // try and parse enemyTypesPlace
        enemyTypesPlaces =
            getEnemyTypesPlaceArray(
                config.enemyTypesPlaces,
                playerPlace,
                gatePlace
            );
    }
    if (!enemyTypesPlaces) {
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

function getEnemyTypesPlaceArray(
    enemyArr,
    //playerplace and gateplace could be used in eval
    playerPlace,
    gatePlace
) {
    var retArray = [];
    if (!(enemyArr instanceof Array)) {
        return null;
    }
    for (var i = 0; i < enemyArr.length; i++) {
        var enemy = enemyArr[i];
        if (!validPlace(enemy)
            || !("shipType" in enemy)) {
            return null;
        }
        var enemyConfig = {
            "x": eval(enemy.x),
            "y": eval(enemy.y),
            "shipType": enemy.shipType,

        };
        if ("route" in enemy && (enemy.route instanceof Array)) {
            var route = [];
            for (var j = 0; j < enemy.route.length; j++) {
                var routePt = enemy.route[j];
                if (!validPlace(routePt)) {
                    return null;
                }
                route.push({ "x": eval(routePt.x), "y": eval(routePt.y) });
            }
            enemyConfig["route"] = route;
        }
        //get enemy places
        retArray.push(enemyConfig);
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