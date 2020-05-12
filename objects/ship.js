// Ship draw constants for 10, 13, 13 triangle 
// with angles 0.78958695 rad, 67.38°, 67.38°
const TIP_ANGLE = 0.78958695;
const SHIP_SIDE = 13;
const TURN_SPEED = Math.PI / 200;

class ShipType {
    static CRUSER = "cruser";
    static CORVETTE = "corvette";
}

class SheildPosition {
    static BACK = 1;
    static EQUAL = 2;
    static FRONT = 3;
}
//engine state defines how much of total speed can be used
class EngineState {
    static REST = 0;
    static TURNING = 1;
    static WARM = 2;
    static MAX = 20;
    static COOLPERIOD = this.MAX - this.WARM;
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
    #engineState

    constructor(x, y, type = ShipType.CRUSER, direction = 0) {
        super(x, y);
        this.origin = { 'x': x, 'y': y };
        this.type = type;
        this.direction = direction;
        this.shieldPosition = SheildPosition.EQUAL;
        this.engineState = EngineState.REST;
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
        let multiplyer = SHIP_SIDE * this.size;
        let leftRightXY = this.getLeftRightXY();
        let leftX = leftRightXY["left"]["x"];
        let leftY = leftRightXY["left"]["y"];
        let rightX = leftRightXY["right"]["x"];
        let rightY = leftRightXY["right"]["y"];
        let cpX = this.x - (multiplyer / 2 * Math.cos(this.direction));
        let cpY = this.y - (multiplyer / 2 * Math.sin(this.direction));

        if (this.shieldStrength > 0) {
            this.drawSheild(ctx, cpX, cpY, multiplyer);
        }

        this.drawShip(ctx, leftX, leftY, rightX, rightY, cpX, cpY, multiplyer);

        //draw dest and plume if dest exists
        if (this.engineState !== EngineState.REST) {
            this.drawDestPlume(ctx, multiplyer);
        }
    }

    drawSheild(ctx, cpX, cpY, multiplyer) {
        ctx.beginPath();
        ctx.fillStyle = "#00B09D";
        //start drawing sheild at -90, then adjust according to sheild position
        let startSheild = this.direction - Math.PI / 2;
        let endSheild = this.direction - Math.PI / 2;
        switch (this.shieldPosition) {
            case SheildPosition.BACK:
                // draw opacity according to strength out of 10 ( 5 for half)
                ctx.globalAlpha = this.shieldStrength / 5.0;
                startSheild = endSheild + Math.PI;
                break;
            case SheildPosition.EQUAL:
                // draw opacity according to strength out of 10
                ctx.globalAlpha = this.shieldStrength / 10.0;
                endSheild = startSheild + 2 * Math.PI;
                break;
            case SheildPosition.FRONT:
                // draw opacity according to strength out of 10 ( 5 for half)
                ctx.globalAlpha = this.shieldStrength / 5.0;
                endSheild = startSheild + Math.PI;
                break
        }
        ctx.arc(cpX, cpY, multiplyer, startSheild, endSheild);
        ctx.fill();
        ctx.globalAlpha = 1.0;
    }

    drawShip(ctx, leftX, leftY, rightX, rightY, cpX, cpY, multiplyer) {
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
    }

    drawDestPlume(ctx, multiplyer) {
        // draw dest
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#03b1fc";
        ctx.arc(this.destination['x'], this.destination['y'], 10, 0, 2 * Math.PI);
        ctx.stroke();
        //reset linewidth
        ctx.lineWidth = 1;
        // Tail engine
        ctx.beginPath();
        ctx.fillStyle = "#fcba03";
        let dpX = this.x - (multiplyer * Math.cos(this.direction));
        let dpY = this.y - (multiplyer * Math.sin(this.direction));
        let sizeDivide = this.engineState < EngineState.MAX ? 20 : 10;
        ctx.arc(dpX, dpY, multiplyer / sizeDivide, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        // if no destination then idle
        if (!this.destination) {
            return;
        }
        if (this.engineState === EngineState.TURNING) {
            // if close enough click to correct direction
            if (Math.abs(this.destination['direction'] - this.direction) < TURN_SPEED) {
                this.direction = this.destination['direction'];
                this.engineState = EngineState.WARM;
            }
            else {// calculate next direction according to closing to destination direction
                let changeDirect =
                    rad2Pos(this.destination['direction'] - this.direction)
                        > rad2Pos(this.direction - this.destination['direction'])
                        ? -1 : 1;
                this.direction = rad2Pos(this.direction + (changeDirect * TURN_SPEED));
                // If next is within pi/10, then pop to direction and change engine state
            }
            return;
        }
        //calculate curr speed
        let engineCoeff = this.engineState === EngineState.MAX ? 1 : 0.4;
        let currSpeed = this.speed * engineCoeff;
        let speedX = currSpeed * Math.cos(this.direction);
        let speedY = currSpeed * Math.sin(this.direction);
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
            this.engineState = EngineState.REST;
            return;
        }
        else {
            this.x = toMoveX;
            this.y = toMoveY;
        }
        //adjust engine state when within 10 speed of distance

        if (distToX < EngineState.COOLPERIOD * Math.abs(speedX)
            &&
            distToY < EngineState.COOLPERIOD * Math.abs(speedY)) {
            this.engineState = EngineState.WARM;
        }
        // Else if engine is warming up, increase warm state
        else if (
            this.engineState < EngineState.MAX
            &&
            this.engineState >= EngineState.WARM
        ) {
            this.engineState++;
        }
    }

    collide(x, y, damage = 1) {
        x = parseFloat(x);
        y = parseFloat(y);
        if (this.checkCollideSheild(x, y, damage)) {
            return false; // since absorbed by sheild
        }
        if (this.checkCollideShip(x, y, damage)) {
            return true; // ship is destroyed
        }
    }

    checkCollideSheild(x, y, damage) {
        // if no sheild then return
        if (this.shieldStrength < 1) {
            return false;
        }
        //check if point is withing shield radius
        let multiplyer = SHIP_SIDE * this.size;
        let cpX = this.x - (multiplyer / 2 * Math.cos(this.direction));
        let cpY = this.y - (multiplyer / 2 * Math.sin(this.direction));
        let a = x - cpX;
        let b = y - cpY;
        let radius = Math.hypot(a, b);
        let angle = Math.atan2(b, a);
        if (radius > multiplyer) {
            return false;
        }
        // if within sheild radius check if in right angle for sheild.
        let left = this.direction - Math.PI / 2;
        let right = left + Math.PI;
        let adjustA, adjustE;
        switch (this.shieldPosition) {
            case SheildPosition.BACK:
                adjustA = rad2Pos(angle - right);
                adjustE = rad2Pos(left - right);
                if (adjustA < adjustE) {
                    this.shieldStrength -= damage;
                    return true;
                }
                return false;
                break;
            case SheildPosition.EQUAL:
                //when sheild is spread thin causes X2 damage
                this.shieldStrength -= damage * 2;
                return true;
            case SheildPosition.FRONT:
                adjustA = rad2Pos(angle - left);
                adjustE = rad2Pos(right - left);
                if (adjustA < adjustE) {
                    this.shieldStrength -= damage;
                    return true;
                }
                return false;
                break
        }
    }

    checkCollideShip(x, y, damage) {
        let leftRightXY = this.getLeftRightXY();
        let leftX = leftRightXY["left"]["x"];
        let leftY = leftRightXY["left"]["y"];
        let rightX = leftRightXY["right"]["x"];
        let rightY = leftRightXY["right"]["y"];
        //get total area and compare to subareas from collide point and rest of triangle
        let areaMain = this.getArea(this.x, this.y, leftX, leftY, rightX, rightY);
        let area1 = this.getArea(x, y, leftX, leftY, rightX, rightY);
        let area2 = this.getArea(this.x, this.y, x, y, rightX, rightY);
        let area3 = this.getArea(this.x, this.y, leftX, leftY, x, y);
        return (parseInt(areaMain) === parseInt(area1 + area2 + area3));
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
        let destDirection = Math.atan2(y - this.y, x - this.x);
        this.destination = { 'x': x, 'y': y, 'direction': rad2Pos(destDirection) };
        this.engineState = EngineState.TURNING;
    }

    setShields(position) {
        this.shieldPosition = position;
    }

    getLeftRightXY() {
        let leftAngle = this.direction - (TIP_ANGLE / 2) + Math.PI;
        let rightAngle = leftAngle + TIP_ANGLE;
        let multiplyer = SHIP_SIDE * this.size;
        let leftX = this.x + (multiplyer * Math.cos(leftAngle));
        let leftY = this.y + (multiplyer * Math.sin(leftAngle));
        let rightX = this.x + (multiplyer * Math.cos(rightAngle));
        let rightY = this.y + (multiplyer * Math.sin(rightAngle));
        return { "left": { "x": leftX, "y": leftY }, "right": { "x": rightX, "y": rightY } };
    }
}