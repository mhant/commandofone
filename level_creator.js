var creatorDiv;
var instructDiv;

function addEnemy() {
    var container = document.getElementById("enemies");
    var clone = document.getElementById("enemy").cloneNode(true);
    container.append(clone);
}

function validate() {
    var clipboard = new ClipboardJS('.btn');

    clipboard.on('success', function (e) {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);

        e.clearSelection();
    });

    clipboard.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });
    
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
    var config = parseConfig(configJson);
    if (config) {
        var displayArea = document.getElementById("config-json");
        displayArea.innerHTML = JSON.stringify(configJson, "\n", "\t");
    }
    return config;
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
    // need to reset height width before configing
    if (!creatorDiv) {
        creatorDiv = document.getElementById("main-box");
    }
    if (!instructDiv) {
        instructDiv = document.getElementById("instructions");
    }
    creatorDiv.style.display = instructDiv.style.display = "none";
    var gameConfig = validate();
    if (gameConfig !== null) {
        var t = this;
        gameConfig.push(t.resume);
        gameConfig.unshift(null);
        gController = new (
            Function.prototype.bind.apply(
                GameController,
                gameConfig
            )
        );
    }
    else {
        creatorDiv.style.display = instructDiv.style.display = "block";
    }
}

function resume() {
    creatorDiv.style.display = instructDiv.style.display = "block";
}

function importJSON() {
    var importText = document.getElementById("import-text").value;
    var importJSON = JSON.parse(importText);
    // Validate and populate text fields
    if (!("playerPlace" in importJSON) ||
        !(validPlace(importJSON.playerPlace))
    ) {
        throw Error("Invalid playerPlace");
    }
    document.getElementById("player_x").value = importJSON.playerPlace.x;
    document.getElementById("player_y").value = importJSON.playerPlace.y;
    if (!("gatePlace" in importJSON) ||
        !(validPlace(importJSON.gatePlace))
    ) {
        throw Error("Invalid gatePlace");
    }
    document.getElementById("gate_x").value = importJSON.gatePlace.x;
    document.getElementById("gate_y").value = importJSON.gatePlace.y;
    if (!("enemyTypesPlaces" in importJSON) ||
        !(importJSON.enemyTypesPlaces instanceof Array)
    ) {
        throw Error("Invalid enemyTypesPlaces");
    }
    var enemies = document.getElementById("enemies");
    var template = document.getElementById("enemy").cloneNode(true);
    enemies.innerHTML = "";
    for (var i = 0; i < importJSON.enemyTypesPlaces.length; i++) {
        var enemy = importJSON.enemyTypesPlaces[i];
        var clone = template.cloneNode(true);
        clone.querySelector("#" + "enemy_x").value = enemy.x;
        clone.querySelector("#" + "enemy_y").value = enemy.y;
        clone.querySelector("#" + "enemy_type").value = enemy.shipType;
        clone.querySelector("#" + "enemy_route").value = JSON.stringify(enemy.route)
            //remove first '[' & last ']'
            .substring(
                1,
                JSON.stringify(enemy.route).length - 1
            );
        enemies.appendChild(clone);
    }
}   