class HowToController {
    // imgDIV
    // callback
    // imgArr
    // currImage
    constructor(callback) {
        setShownGuide();
        this.imgDIV = document.getElementById("tutorial");
        this.imgDIV.width = this.width = getWidth() - 50;
        this.imgDIV.height = this.height = getHeight() - 75;
        this.callback = callback;
        this.initHowToImages();
        this.imgDIV.src = this.imgArr[this.currImage];
        var t = this;
        this.imgDIV.addEventListener('click', function (event) { t.clickHandler(event) });
    }

    start(){
        this.currImage = 0;
        this.imgDIV.src = this.imgArr[this.currImage];
        this.imgDIV.style.display = "block";
    }

    initHowToImages() {
        this.imgArr = [
            "img/gameboard-sheild-controls.png",
            "img/gameboard-navigation.png",
            "img/gameboard-gate.png",
            "img/gameboard-enemy-radar.png"
        ];
    }

    clickHandler(event) {
        this.currImage++;
        if (this.currImage < this.imgArr.length) {
            this.imgDIV.src = this.imgArr[this.currImage];
        }
        else {
            this.imgDIV.style.display = "none";
            this.callback();

        }
    }
}