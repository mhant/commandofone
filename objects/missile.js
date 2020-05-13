const MISSILE_DIAM = 4;
const MISSILE_SPEED = 4;

class Missile extends DrawableObject {
    #target
    #direction
    constructor(x, y, target) {
        if (!('x' in target) || !('y' in target)) {
            throw new Error('Invalid target');
        }
        super(x, y);
        this.target = target;
        this.direction = Math.atan2(target.y - this.y, target.x - this.x);
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "#A1AF9F";
        ctx.arc(this.x, this.y, MISSILE_DIAM, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        // get new angle
        this.direction = Math.atan2(this.target.y - this.y, this.target.x - this.x);
        let speedX = MISSILE_SPEED * Math.cos(this.direction);
        let speedY = MISSILE_SPEED * Math.sin(this.direction);
        this.x += speedX;
        this.y += speedY;

    }
    // TODO implement
    collide(x, y) {
        throw new Error('Not implmented');
    }
}