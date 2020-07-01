class MenuController {
    // hint
    // menu
    // levelClicked
    // grid
    // tutorialButton
    constructor() {
        this.grid = document.getElementById("levels-menu");
        this.hint = document.getElementById("menu-tip");
        this.menu = document.getElementById("menu");
        this.tutorialButton = document.getElementById("tutorial-button");
        this.refresh();
    }

    onMouseOver(event, isLevel) {
        if (isLevel) {
            var levelString = event.currentTarget.innerHTML;
            var levelInt = parseInt(levelString);
            this.hint.innerHTML = levelString + ": " + levels[levelInt].name;
        }
        else {
            this.hint.innerHTML = "View Tutorial";
        }
    }

    onClick(event, isLevel) {
        closePopup();
        this.menu.style.display = "none";
        if (isLevel) {
            let levelInt = parseInt(event.currentTarget.innerHTML);
            this.levelClicked = levelInt;
            startGame(levelInt);
        }
        else {
            intro();
        }
    }

    refresh() {
        this.levelClicked = 0;
        this.grid.innerHTML = '';
        this.grid.width = this.width = getWidth() - 50;
        this.grid.height = this.height = getHeight() - 75;
        this.menu.style.display = "block";
        var t = this;
        t.hint.innerHTML = "Pick a level above or tutorial";
        let lastCompletedLevel = passphrase2Level(getLastLevelCode());
        // For each level add a grid item
        for (var i = 0; i < levels.length; i++) {
            var menuItem = document.createElement("BUTTON");
            if (i > lastCompletedLevel) {
                menuItem.diabled = true;
                menuItem.className = "menu-item-disabled";
            }
            else {
                menuItem.className = "menu-item";
                menuItem.onclick = function (event) {
                    t.onClick(event, true);
                }
            }
            menuItem.onmouseover = function (event) {
                t.onMouseOver(event, true);
            }
            menuItem.onmouseout = function (event) {
                t.hint.innerHTML = "Pick a level above or tutorial";
            }
            menuItem.innerHTML = i;
            this.grid.appendChild(menuItem);
        }
        // generate hover and onclick for tutorial

        this.tutorialButton.onmouseover = function (event) {
            t.onMouseOver(event, false);
        }
        this.tutorialButton.onmouseout = function (event) {
            t.hint.innerHTML = "Pick a level above or tutorial";
        }
        this.tutorialButton.onclick = function (event) {
            t.onClick(event, false);
        }

        // init the code area and show the last recieved code
        var prevCode = document.getElementById("latest-code");
        var code = getLastLevelCode();
        if (code) {
            prevCode.innerHTML = "Level Code: <i><b>" +
                code.join(" ") +
                "<i></b>";
        }
        else {
            prevCode.innerHTML = "No previous save code";
        }
    }
}