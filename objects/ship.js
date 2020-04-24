class ShipType {
    static CRUSER = "cruser";
    static CORVETTE = "corvette";
}

class Ship extends drawableObject {
    #type
    #direction
    #size
    #color
    constructor(x, y, type = ShipType.CRUSER) {
        super(x, y);
        this.type = type;
        this.direction = 0;
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
    draw(context) {
        // X & Y left wing tip of ship
        //TODO implement direction, right now all is 90
        context.fillStyle = this.color;
        // Draw left wing
        context.fillRect(this.x, this.y, this.size, this.size);
        // Draw center
        context.fillRect(this.x+this.size, this.y, this.size, (this.size*2));
        context.fillRect(this.x+(this.size*2), this.y, this.size, (this.size*3));
        context.fillRect(this.x+(this.size*3), this.y, this.size, (this.size*2));
        // Draw right wing
        context.fillRect(this.x+(this.size*4), this.y, this.size, this.size);

    }
    update() {

    }
    collide() {

    }

}