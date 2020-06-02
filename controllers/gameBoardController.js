class GameBoardController {
    #canvas
    leftAdjust
    topAdjust
    width
    height
    start() {
        this.canvas = document.getElementById("gboard");
        this.setSize();
        this.context = this.canvas.getContext("2d");
        
        this.leftAdjust = this.canvas.offsetLeft + this.canvas.clientLeft;
        this.topAdjust = this.canvas.offsetTop + this.canvas.clientTop;
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    setSize() {
        this.canvas.width = this.width = getWidth() - 50;
        this.canvas.height = this.height = getHeight() - 75;
    }
}