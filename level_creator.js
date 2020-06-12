var creatorDiv;

function addEnemy() {
    var container = document.getElementById("enemies");
    var clone = document.getElementById("enemy").cloneNode(true);
    container.append(clone);
}

function validate() {
    var playerX = document.getElementById("player_x").value;
    var playerY = document.getElementById("player_y").value;
    var gateX = document.getElementById("gate_x").value;
    var gateY = document.getElementById("gate_y").value;
    var enemyChildren = document.getElementById("enemies").childNodes;
    var enemyConfigs = [];
    for (var i = 0; i < enemyChildren.length; i++) {
        var enemy = enemyChildren[i];
        //only scrape enemy objects none of the additional fluff
        if (enemy.id === "enemy") {
            var enemyConfig = getEnemyObject(enemy, playerX, playerY, gateX, gateY);
            enemyConfigs.push(enemyConfig);
        }
    }
    var configJson = {
        "playerPlace": { "x": playerX, "y": playerY },
        "gatePlace": { "x": gateX, "y": gateY },
        "enemyTypesPlaces": enemyConfigs
    };
    return parseConfig(configJson);
}

function getEnemyObject(enemyNode, playerX, playerY, gateX, gateY) {
    var enemyX = enemyNode.querySelector("#" + "enemy_x").value;
    var enemyY = enemyNode.querySelector("#" + "enemy_y").value;
    var enemyType = enemyNode.querySelector("#" + "enemy_type").value;
    var route = parseRoute(enemyNode);
    return {
        "x": enemyX,
        "y": enemyY,
        "shipType": enemyType === "cruser" ? ShipType.CRUSER : ShipType.CORVETTE,
        "route": route
    }
}

function parseRoute(enemyNode) {
    return JSON.parse(
        "[" +
        enemyNode.querySelector("#" + "enemy_route").value +
        "]"
    );

}

function play() {
    var gameConfig = validate();
    if (gameConfig !== null) {
        if (!creatorDiv) {
            creatorDiv = document.getElementById("main-box");
        }
        creatorDiv.style.display = "none";
        var t = this;
        gameConfig.push(t.resume);
        gameConfig.unshift(null);
        gController = new (Function.prototype.bind.apply(GameController, gameConfig));
    }
}

function resume() {
    creatorDiv.style.display = "block";
}