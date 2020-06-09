class MenuController {
    #hint
    #menu
    constructor() {
        var grid = document.getElementById("levels-menu");
        grid.innerHTML = '';
        grid.width = this.width = getWidth() - 50;
        grid.height = this.height = getHeight() - 75;
        this.hint = document.getElementById("menu-tip");
        this.menu = document.getElementById("menu");
        var t = this;
        this.menu.style.display = "block";
        t.hint.innerHTML = "Pick a level above or tutorial";
        // For each level add a grid item
        for (var i = 0; i < levels.length; i++) {
            var menuItem = document.createElement("BUTTON");
            menuItem.className = "menu-item";
            menuItem.onmouseover = function (event) {
                t.onMouseOver(event, true);
            }
            menuItem.onmouseout = function (event) {
                t.hint.innerHTML = "Pick a level above or tutorial";
            }
            menuItem.innerHTML = i;
            menuItem.onclick = function (event) {
                t.onClick(event, true);
            }
            grid.appendChild(menuItem);
        }
        // generate hover and onclick for tutorial
        var tutorialButton = document.getElementById("tutorial-button");
        tutorialButton.onmouseover = function (event) {
            t.onMouseOver(event, false);
        }
        tutorialButton.onmouseout = function (event) {
            t.hint.innerHTML = "Pick a level above or tutorial";
        }
        tutorialButton.onclick = function (event) {
            t.onClick(event, false);
        }
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
        this.menu.style.display = "none";
        if (isLevel) {
            startGame(parseInt(event.currentTarget.innerHTML));
        }
        else {
            intro();
        }
    }
}