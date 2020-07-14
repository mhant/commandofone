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
        "name": "Chase and Guard",
        "playerPlace": {
            "x": "50",
            "y": "getHeight()/2"
        },
        "gatePlace": {
            "x": "getWidth()-100",
            "y": "getHeight()/2-GATE_HEIGHT/2"
        },
        "enemyTypesPlaces": [
            {
                "x": "playerPlace.x",
                "y": "playerPlace.y + 200",
                "shipType": "cruser",
                "route": [
                    {
                        "x": "gatePlace.x - 100",
                        "y": "gatePlace.y + 25 + GATE_HEIGHT"
                    },
                    {
                        "x": "gatePlace.x - 100",
                        "y": "gatePlace.y - 25"
                    }
                ]
            },
            {
                "x": "playerPlace.x",
                "y": "playerPlace.y - 200",
                "shipType": "cruser",
                "route": [
                    {
                        "x": "gatePlace.x - 100",
                        "y": "gatePlace.y - 25"
                    },
                    {
                        "x": "gatePlace.x - 100",
                        "y": "gatePlace.y + 25 + GATE_HEIGHT"
                    }
                ]
            }
        ]
    },
    {
        "name": "To the Start",
        "playerPlace": {
            "x": "50",
            "y": "getHeight()/2"
        },
        "gatePlace": {
            "x": "getWidth()-100",
            "y": "getHeight()/2-GATE_HEIGHT/2"
        },
        "enemyTypesPlaces": [
            {
                "x": "gatePlace.x",
                "y": "gatePlace.y+GATE_HEIGHT/2",
                "shipType": "corvette",
                "route": [
                    {
                        "x": "playerPlace.x",
                        "y": "playerPlace.y"
                    }
                ]
            },
            {
                "x": "gatePlace.x",
                "y": "gatePlace.y+GATE_HEIGHT/2-200",
                "shipType": "corvette",
                "route": [
                    {
                        "x": "playerPlace.x",
                        "y": "playerPlace.y"
                    }
                ]
            },
            {
                "x": "gatePlace.x",
                "y": "gatePlace.y+GATE_HEIGHT/2+200",
                "shipType": "corvette",
                "route": [
                    {
                        "x": "playerPlace.x",
                        "y": "playerPlace.y"
                    }
                ]
            }
        ]
    },
    {
        "name": "Grid search",
        "playerPlace": {
            "x": "50",
            "y": "getHeight()/2"
        },
        "gatePlace": {
            "x": "getWidth()-100",
            "y": "getHeight()/2-GATE_HEIGHT/2"
        },
        "enemyTypesPlaces": [
            {
                "x": "50",
                "y": "50",
                "shipType": "cruser",
                "route": [
                    {
                        "x": "50",
                        "y": "getHeight()-100"
                    },
                    {
                        "x": "getWidth()/2",
                        "y": "getHeight()-100"
                    },
                    {
                        "x": "getWidth()/2",
                        "y": "50"
                    },
                    {
                        "x": "getWidth()-50",
                        "y": "50"
                    },
                    {
                        "x": "getWidth()-50",
                        "y": "getHeight()-100"
                    },
                    {
                        "x": "50",
                        "y": "50"
                    }
                ]
            },
            {
                "x": "50",
                "y": "getHeight()-100",
                "shipType": "cruser",
                "route": [
                    {
                        "x": "50",
                        "y": "50"
                    },
                    {
                        "x": "50",
                        "y": "getHeight()-100"
                    },
                    {
                        "x": "getWidth()/2",
                        "y": "getHeight()-100"
                    },
                    {
                        "x": "getWidth()/2",
                        "y": "50"
                    },
                    {
                        "x": "getWidth()-50",
                        "y": "50"
                    },
                    {
                        "x": "getWidth()-50",
                        "y": "getHeight()-100"
                    }
                ]
            }
        ]
    },
    {
        "name": "The Wall",
        "playerPlace": {
            "x": "50",
            "y": "getHeight()/2"
        },
        "gatePlace": {
            "x": "getWidth()-100",
            "y": "getHeight()/2-GATE_HEIGHT/2"
        },
        "enemyTypesPlaces": [
            {
                "x": "gatePlace.x",
                "y": "gatePlace.y+GATE_HEIGHT/2",
                "shipType": "corvette",
                "route": [
                    {
                        "x": "playerPlace.x",
                        "y": "playerPlace.y"
                    }
                ]
            },
            {
                "x": "gatePlace.x",
                "y": "gatePlace.y+GATE_HEIGHT/2-100",
                "shipType": "corvette",
                "route": [
                    {
                        "x": "playerPlace.x",
                        "y": "playerPlace.y-100"
                    }
                ]
            },
            {
                "x": "gatePlace.x",
                "y": "gatePlace.y+GATE_HEIGHT/2+100",
                "shipType": "corvette",
                "route": [
                    {
                        "x": "playerPlace.x",
                        "y": "playerPlace.y+100"
                    }
                ]
            },
            {
                "x": "gatePlace.x",
                "y": "gatePlace.y+GATE_HEIGHT/2+200",
                "shipType": "cruser",
                "route": [
                    {
                        "x": "playerPlace.x",
                        "y": "playerPlace.y"
                    }
                ]
            },
            {
                "x": "gatePlace.x",
                "y": "gatePlace.y+GATE_HEIGHT/2-200",
                "shipType": "cruser",
                "route": [
                    {
                        "x": "playerPlace.x",
                        "y": "playerPlace.y"
                    }
                ]
            },
            {
                "x": "gatePlace.x+200",
                "y": "gatePlace.y+GATE_HEIGHT/2",
                "shipType": "cruser",
                "route": [
                    {
                        "x": "playerPlace.x",
                        "y": "playerPlace.y"
                    }
                ]
            }
        ]


    },
    {
        "name": "X Marks the Spot",
        "playerPlace": {
            "x": "50",
            "y": "getHeight()/2"
        },
        "gatePlace": {
            "x": "getWidth()-100",
            "y": "getHeight()/2-GATE_HEIGHT/2"
        },
        "enemyTypesPlaces": [
            {
                "x": "50",
                "y": "50",
                "shipType": "cruser",
                "route": [
                    {
                        "x": "getWidth()-50",
                        "y": "getHeight()-50"
                    },
                    {
                        "x": "50",
                        "y": "50"
                    }
                ]
            },
            {
                "x": "getWidth()-50",
                "y": "getHeight()-50",
                "shipType": "corvette",
                "route": [
                    {
                        "x": "50",
                        "y": "50"
                    },
                    {
                        "x": "getWidth()-50",
                        "y": "getHeight()-50"
                    }
                ]
            },
            {
                "x": "getWidth()-50",
                "y": "50",
                "shipType": "cruser",
                "route": [
                    {
                        "x": "50",
                        "y": "getHeight()-50"
                    },
                    {
                        "x": "getWidth()-50",
                        "y": "50"
                    }
                ]
            },
            {
                "x": "50",
                "y": "getHeight()-50",
                "shipType": "corvette",
                "route": [
                    {
                        "x": "getWidth()-50",
                        "y": "50"
                    },
                    {
                        "x": "50",
                        "y": "getHeight()-50"
                    }
                ]
            }
        ]
    },
    {
        "name": "Hidden Hunters",
        "playerPlace": {
            "x": "50",
            "y": "getHeight()/2"
        },
        "gatePlace": {
            "x": "getWidth()-100",
            "y": "getHeight()/2-GATE_HEIGHT/2"
        },
        "enemyTypesPlaces": [
            {
                "x": "0",
                "y": "0",
                "shipType": "cruser",
                "route": [
                    {
                        "x": "200",
                        "y": "getHeight()+200"
                    },
                    {
                        "x": "getWidth()/2-200",
                        "y": "0"
                    },
                    {
                        "x": "getWidth()/2",
                        "y": "getHeight()+200"
                    },
                    {
                        "x": "getWidth()-200",
                        "y": "0"
                    },
                    {
                        "x": "getWidth()+200",
                        "y": "getHeight()+200"
                    },
                    {
                        "x": "0",
                        "y": "0"
                    }
                ]
            },
            {
                "x": "200",
                "y": "getHeight()+200",
                "shipType": "cruser",
                "route": [
                    {
                        "x": "getWidth()/2-200",
                        "y": "0"
                    },
                    {
                        "x": "getWidth()/2",
                        "y": "getHeight()+200"
                    },
                    {
                        "x": "getWidth()-200",
                        "y": "0"
                    },
                    {
                        "x": "getWidth()+200",
                        "y": "getHeight()+200"
                    },
                    {
                        "x": "0",
                        "y": "0"
                    },
                    {
                        "x": "200",
                        "y": "getHeight()+200"
                    }
                ]
            },
            {
                "x": "getWidth()/2-200",
                "y": "0",
                "shipType": "cruser",
                "route": [
                    {
                        "x": "getWidth()/2",
                        "y": "getHeight()+200"
                    },
                    {
                        "x": "getWidth()-200",
                        "y": "0"
                    },
                    {
                        "x": "getWidth()+200",
                        "y": "getHeight()+200"
                    },
                    {
                        "x": "0",
                        "y": "0"
                    },
                    {
                        "x": "200",
                        "y": "getHeight()+200"
                    },
                    {
                        "x": "getWidth()/2-200",
                        "y": "0"
                    }
                ]
            },
            {
                "x": "getWidth()/2",
                "y": "getHeight()+200",
                "shipType": "cruser",
                "route": [
                    {
                        "x": "getWidth()-200",
                        "y": "0"
                    },
                    {
                        "x": "getWidth()+200",
                        "y": "getHeight()+200"
                    },
                    {
                        "x": "0",
                        "y": "0"
                    },
                    {
                        "x": "200",
                        "y": "getHeight()+200"
                    },
                    {
                        "x": "getWidth()/2-200",
                        "y": "0"
                    },
                    {
                        "x": "getWidth()/2",
                        "y": "getHeight()+200"
                    }
                ]
            },
            {
                "x": "getWidth()-200",
                "y": "0",
                "shipType": "cruser",
                "route": [
                    {
                        "x": "getWidth()+200",
                        "y": "getHeight()+200"
                    },
                    {
                        "x": "0",
                        "y": "0"
                    },
                    {
                        "x": "200",
                        "y": "getHeight()+200"
                    },
                    {
                        "x": "getWidth()/2-200",
                        "y": "0"
                    },
                    {
                        "x": "getWidth()/2",
                        "y": "getHeight()+200"
                    },
                    {
                        "x": "getWidth()-200",
                        "y": "0"
                    }
                ]
            },
            {
                "x": "getWidth()+200",
                "y": "getHeight()+200",
                "shipType": "cruser",
                "route": [
                    {
                        "x": "0",
                        "y": "0"
                    },
                    {
                        "x": "200",
                        "y": "getHeight()+200"
                    },
                    {
                        "x": "getWidth()/2-200",
                        "y": "0"
                    },
                    {
                        "x": "getWidth()/2",
                        "y": "getHeight()+200"
                    },
                    {
                        "x": "getWidth()-200",
                        "y": "0"
                    },
                    {
                        "x": "getWidth()+200",
                        "y": "getHeight()+200"
                    }
                ]
            }
        ]
    },
    {
        "name": "The Eitan Peretz Maneuver",
        "playerPlace": {
            "x": "getWidth()-100",
            "y": "getHeight()/2"
        },
        "gatePlace": {
            "x": "0",
            "y": "0"
        },
        "enemyTypesPlaces": [
            {
                "x": "50",
                "y": "playerPlace.y + 100",
                "shipType": "cruser",
                "route": [
                    {
                        "x": "getWidth()",
                        "y": "playerPlace.y + 100"
                    },
                    {
                        "x": "50",
                        "y": "playerPlace.y + 100"
                    }
                ]
            },
            {
                "x": "50",
                "y": "playerPlace.y - 100",
                "shipType": "cruser",
                "route": [
                    {
                        "x": "getWidth()",
                        "y": "playerPlace.y - 100"
                    },
                    {
                        "x": "50",
                        "y": "playerPlace.y - 100"
                    }
                ]
            },
            {
                "x": "getWidth()",
                "y": "playerPlace.y + 100",
                "shipType": "cruser",
                "route": [
                    {
                        "x": "50",
                        "y": "playerPlace.y + 100"
                    },
                    {
                        "x": "getWidth()",
                        "y": "playerPlace.y + 100"
                    }
                ]
            },
            {
                "x": "getWidth()",
                "y": "playerPlace.y - 100",
                "shipType": "cruser",
                "route": [
                    {
                        "x": "50",
                        "y": "playerPlace.y - 100"
                    },
                    {
                        "x": "getWidth()",
                        "y": "playerPlace.y - 100"
                    }
                ]
            },
            {
                "x": "gatePlace.x+200",
                "y": "50",
                "shipType": "corvette",
                "route": [
                    {
                        "x": "gatePlace.x+200",
                        "y": "getHeight()"
                    },
                    {
                        "x": "gatePlace.x+200",
                        "y": "50"
                    }
                ]
            },
            {
                "x": "gatePlace.x+200",
                "y": "getHeight()/2",
                "shipType": "corvette",
                "route": [
                    {
                        "x": "gatePlace.x+200",
                        "y": "50"
                    },
                    {
                        "x": "gatePlace.x+200",
                        "y": "getHeight()"
                    }
                ]
            },
            {
                "x": "0",
                "y": "gatePlace.y + GATE_HEIGHT/2",
                "shipType": "corvette",
                "route": [
                    {
                        "x": "getWidth()",
                        "y": "gatePlace.y + GATE_HEIGHT/2"
                    },
                    {
                        "x": "50",
                        "y": "gatePlace.y + GATE_HEIGHT/2"
                    }
                ]
            },
            {
                "x": "getWidth()/2",
                "y": "gatePlace.y + GATE_HEIGHT/2",
                "shipType": "corvette",
                "route": [
                    {
                        "x": "50",
                        "y": "gatePlace.y + GATE_HEIGHT/2"
                    },
                    {
                        "x": "getWidth()",
                        "y": "gatePlace.y + GATE_HEIGHT/2"
                    }
                ]
            },
            {
                "x": "getWidth()/2",
                "y": "playerPlace.y + 100",
                "shipType": "cruser",
                "route": [
                    {
                        "x": "getWidth()",
                        "y": "playerPlace.y + 100"
                    },
                    {
                        "x": "50",
                        "y": "playerPlace.y + 100"
                    }
                ]
            },
            {
                "x": "getWidth()/2",
                "y": "playerPlace.y - 100",
                "shipType": "cruser",
                "route": [
                    {
                        "x": "getWidth()",
                        "y": "playerPlace.y - 100"
                    },
                    {
                        "x": "50",
                        "y": "playerPlace.y - 100"
                    }
                ]
            }
        ]


    },
    {
        "name": "Random 1",
    },
    {
        "name": "Random 2",
    },
    {
        "name": "Random 3",
    },
    {
        "name": "Random 4",
    },
    {
        "name": "Random 5",
    },
    {
        "name": "Random 6",
    },
    {
        "name": "Random 7",
    },
    {
        "name": "Random 8",
    },
    {
        "name": "Random 9",
    },
    {
        "name": "Random 10",
    },
    {
        "name": "Random 11",
    },
    {
        "name": "Random 12",
    },
    {
        "name": "Random 13",
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

function passphrase2Level(passphrase) {
    let level = 0;
    if (!passphrase) {
        return level;
    }
    for (var i = 0; i < passphrase.length; i++) {
        let factor = Math.pow(10, i);
        var find = wordHash.indexOf(passphrase[i]);
        if (find < 0) {
            return 0;
        }
        level += find * factor;
    }
    return level / Math.floor(Math.PI * 7);
}

function level2Passphrase(level) {
    let levelInt = parseInt(level);
    let passphrase = [];
    if (levelInt === NaN || levelInt < 1 || levelInt > levels.length) {
        throw Error("Invalid level, must be int between 0 and " + levels.length);
    }
    //ENHANCE
    levelInt *= Math.floor(Math.PI * 7);
    //WORDS
    while (levelInt > 0) {
        passphrase.push(wordHash[levelInt % 10]);
        levelInt = (levelInt - levelInt % 10) / 10;
    }
    return passphrase;
}

const wordHash = [
    "accept",
    "pop",
    "origin",
    "communist",
    "shrink",
    "cousin",
    "divide",
    "wonder",
    "meet",
    "environmental",
    "grace",
    "therapist",
    "reduce",
    "minor",
    "fold",
    "full",
    "fast",
    "criminal",
    "promote",
    "collect"
];