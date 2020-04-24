// Ship draw constants for 10, 13, 13 triangle 
// with angles 45.24°, 67.38°, 67.38°
const TIP_ANGLE = 45.24;
const SHIP_SIDE = 13;

class ShipType {
    static CRUSER = "cruser";
    static CORVETTE = "corvette";
}

class Ship extends drawableObject {
    #type
    #direction
    #size
    #color

    static #SHIP_
    constructor(x, y, type = ShipType.CRUSER, direction = 0) {
        super(x, y);
        this.type = type;
        this.direction = direction;
        switch (type) {
            case ShipType.CRUSER:
                this.size = 5;
                this.color = "#e0e0eb";
                break;
            case ShipType.CORVETTE:
                this.size = 10;
                this.color = "#ff8080"
                break;
        }

    }
    draw(ctx) {
        // X & Y is tip of ship and direction is angle of base-middle
        let leftAngle = this.direction - (TIP_ANGLE / 2);
        let rightAngle = leftAngle + TIP_ANGLE;
        let multiplyer = SHIP_SIDE * this.size;
        let leftX = this.x + (multiplyer * Math.cos((leftAngle * Math.PI) / 180));
        let leftY = this.y + (multiplyer * Math.sin((leftAngle * Math.PI) / 180));
        let rightX = this.x + (multiplyer * Math.cos((rightAngle * Math.PI) / 180));
        let rightY = this.y + (multiplyer * Math.sin((rightAngle * Math.PI) / 180));
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(leftX, leftY);
        ctx.lineTo(rightX, rightY);
        ctx.fill();
        ctx.fillStyle = "#00FF00";
        ctx.fillRect(this.x, this.y, 5, 5);
        ctx.fillRect(this.x, this.y, 5, 5);
        ctx.fillRect(this.x, this.y, 5, 5);
    }
    update() {

    }
    collide() {

    }

}