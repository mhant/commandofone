class MenuController {
    #hint
    constructor() {
        var grid = document.getElementById("menu");
        grid.width = this.width = getWidth() - 50;
        grid.height = this.height = getHeight() - 75;
        this.hint = document.getElementById("menu-tip");
        var t = this;
        // For each level add a grid item
        for (var i = 0; i < levels.length; i++) {
            var menuItem = document.createElement("BUTTON");
            menuItem.className = "menu-item";
            //TODO look at https://javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave
            menuItem.onmouseover = function (event) {
                var levelString = event.currentTarget.innerHTML;
                var levelInt = parseInt(levelString);
                t.hint.innerHTML = levelString + ": " + levels[levelInt].name;
            }
            menuItem.onmouseout = function (event) {
                t.hint.innerHTML = "Choose a level";
            }
            menuItem.innerHTML = i;
            grid.appendChild(menuItem);
        }
    }
}