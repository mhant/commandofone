const CollideState = Object.freeze({
    'MISS': 0,
    'HIT': 1,
    'KILL': 2
});

class DrawableObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    // abstract method 
    draw(context) {
        throw new Error('draw not implemented');
    }
    // Not required, some objects might have no updates
    update() { }
    // Not required, some objects might not be collidable
    collide(x, y) { return this.x === x && this.y === y }
}