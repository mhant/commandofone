class GameBoardController {
    //fields
    //canvas - html5 canvas
    //context - 2d drawing context
    //leftAdjust - how much to offset left
    //topAdjust - how much to offset top
    //shakeDiff - shake direction 10 or -10 
    start() {
        this.canvas = document.getElementById("gboard");
        this.setSize();
        this.context = this.canvas.getContext("2d");
        this.shakeDiff = 20;
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
    shake(){
        this.context.translate(this.shakeDiff, this.shakeDiff);
        this.shakeDiff = 0 - this.shakeDiff;
    }
}