const GATE_WIDTH = 40;
const GATE_HEIGHT = 100;

class Gate extends DrawableObject {

    draw(ctx) {
        ctx.beginPath();
        ctx.globalAlpha = .25;
        ctx.fillStyle = "#00A6FF";
        ctx.rect(this.x, this.y, GATE_WIDTH, GATE_HEIGHT);
        ctx.fill();
        ctx.closePath();
        ctx.globalAlpha = .50;
        ctx.beginPath();
        ctx.fillStyle = "#A1AF9F";
        ctx.rect(
            this.x + GATE_WIDTH / 4,
            this.y + GATE_HEIGHT / 4,
            3 * GATE_WIDTH / 4,
            GATE_HEIGHT / 2);
        ctx.fill();
        ctx.closePath();
        ctx.globalAlpha = 1.0;
    }

    update() {
        // gate shouldn't do anything on update
    }
    // TODO implement
    collide(x, y) {
        return x >= this.x && x <= this.x + GATE_WIDTH && y >= this.y && y <= this.y + GATE_HEIGHT;
    }
}