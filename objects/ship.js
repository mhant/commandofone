// Ship draw constants for 10, 13, 13 triangle 
// with angles 0.78958695 rad, 67.38°, 67.38°
const TIP_ANGLE = 0.78958695;
const SHIP_SIDE = 13;

class ShipType {
    static CRUSER = "cruser";
    static CORVETTE = "corvette";
}

class SheildPosition {
    static back = 1;
    static equal = 2;
    static front = 3;
}

class Ship extends drawableObject {
    #type
    #direction
    #size
    #color
    #destination
    #origin
    #speed
    #shieldPosition
    #shieldStrength

    static #SHIP_
    constructor(x, y, type = ShipType.CRUSER, direction = 0) {
        super(x, y);
        this.origin = { 'x': x, 'y': y };
        this.type = type;
        this.direction = direction;
        this.shieldPosition = SheildPosition.equal;
        switch (type) {
            case ShipType.CRUSER:
                this.size = 5;
                this.color = "#5c5b5c";
                this.speed = 5;
                this.shieldStrength = 2;
                break;
            case ShipType.CORVETTE:
                this.size = 10;
                this.color = "#ff8080";
                this.speed = 3;
                this.shieldStrength = 4;
                break;
        }

    }
    draw(ctx) {
        // X & Y is tip of ship and direction is angle of base-middle
        let leftAngle = this.direction - (TIP_ANGLE / 2) + Math.PI;
        let rightAngle = leftAngle + TIP_ANGLE;
        let multiplyer = SHIP_SIDE * this.size;
        let leftX = this.x + (multiplyer * Math.cos(leftAngle));
        let leftY = this.y + (multiplyer * Math.sin(leftAngle));
        let rightX = this.x + (multiplyer * Math.cos(rightAngle));
        let rightY = this.y + (multiplyer * Math.sin(rightAngle));
        let cpX = this.x - (multiplyer / 2 * Math.cos(this.direction));
        let cpY = this.y - (multiplyer / 2 * Math.sin(this.direction));
        //draw sheild
        ctx.beginPath();
        ctx.fillStyle = "#00B09D";
        //start drawing sheild at -90, then adjust according to sheild position
        let startSheild = this.direction - Math.PI / 2;
        let endSheild = this.direction - Math.PI / 2;
        switch (this.shieldPosition) {
            case SheildPosition.back:
                startSheild = endSheild + Math.PI;
                break;
            case SheildPosition.equal:
                endSheild = startSheild +  2 * Math.PI;
                break;
            case SheildPosition.front:
                endSheild = startSheild + Math.PI;
                break
        }
        ctx.arc(cpX, cpY, multiplyer, startSheild, endSheild);
        ctx.fill();
        //draw ship triangle
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(leftX, leftY);
        ctx.lineTo(rightX, rightY);
        ctx.fill();
        //draw cockpit
        ctx.beginPath();
        ctx.fillStyle = "#9c22e3";
        ctx.arc(cpX, cpY, multiplyer / 8, 0, 2 * Math.PI);
        ctx.fill();
        //draw dest and plume if dest exists
        if (this.destination) {
            // draw dest
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = "#03b1fc";
            ctx.arc(this.destination['x'], this.destination['y'], 10, 0, 2 * Math.PI);
            ctx.stroke();
            //reset linewidth
            ctx.lineWidth = 1;
            //tail point
            ctx.beginPath();
            ctx.fillStyle = "#fcba03";
            let dpX = this.x - (multiplyer * Math.cos(this.direction));
            let dpY = this.y - (multiplyer * Math.sin(this.direction));
            ctx.arc(dpX, dpY, multiplyer / 10, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    update() {
        // if no destination then idle
        if (!this.destination) {
            return;
        }
        let speedX = this.speed * Math.cos(this.direction);
        let speedY = this.speed * Math.sin(this.direction);
        let toMoveX = this.x + speedX;
        let toMoveY = this.y + speedY;
        let distToX = Math.round(Math.abs(toMoveX - this.destination['x']));
        let distToY = Math.round(Math.abs(toMoveY - this.destination['y']));
        //if we're within pixel of destination pop to destination
        if (distToX < Math.abs(speedX) && distToY < Math.abs(speedY)) {
            this.x = this.destination['x'];
            this.y = this.destination['y'];
            this.origin = this.destination;
            this.destination = null;
        }
        else {
            this.x = toMoveX;
            this.y = toMoveY;
        }
    }
    collide(x, y) {
        x = parseFloat(x);
        y = parseFloat(y);
        //TODO move to seperate function to not duplicate
        let leftAngle = this.direction - (TIP_ANGLE / 2) + Math.PI;
        let rightAngle = leftAngle + TIP_ANGLE;
        let multiplyer = SHIP_SIDE * this.size;
        let leftX = this.x + (multiplyer * Math.cos(leftAngle));
        let leftY = this.y + (multiplyer * Math.sin(leftAngle));
        let rightX = this.x + (multiplyer * Math.cos(rightAngle));
        let rightY = this.y + (multiplyer * Math.sin(rightAngle));
        //get total area and compare to subareas from collide point and rest of triangle
        let areaMain = this.getArea(this.x, this.y, leftX, leftY, rightX, rightY);
        let area1 = this.getArea(x, y, leftX, leftY, rightX, rightY);
        let area2 = this.getArea(this.x, this.y, x, y, rightX, rightY);
        let area3 = this.getArea(this.x, this.y, leftX, leftY, x, y);
        return parseInt(areaMain) === parseInt(area1 + area2 + area3);
    }
    getArea(x1, y1, x2, y2, x3, y3) {
        return Math.abs(((x1 - x3) * (y2 - y1) - (x1 - x2) * (y3 - y1)) / 2);
    }
    navigateTo(x, y) {
        x = parseFloat(x);
        y = parseFloat(y);
        // If alread at coordinate
        if (this.x === x && this.y === y) {
            return;
        }
        this.destination = { 'x': x, 'y': y };
        this.direction = Math.atan2(y - this.y, x - this.x);
    }

    setShields(position) {
        this.shieldPosition = position;
    }
}