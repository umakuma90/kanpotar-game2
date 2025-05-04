export class Obstacle {
    constructor(x, y, width, height, speed, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.type = type; // "green" o "red"
        this.image = new Image();

        if (type === "green") {
            this.image.src = 'assets/obstacle-green.png';
        } else {
            this.image.src = 'assets/obstacle-red.png';
        }
    }

    update() {
        this.x -= this.speed;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    isOutOfBounds(canvasWidth) {
        return this.x + this.width < 0;
    }

    checkCollision(kanpotar) {
        return (
            this.x < kanpotar.x + kanpotar.width &&
            this.x + this.width > kanpotar.x &&
            this.y < kanpotar.y + kanpotar.height &&
            this.y + this.height > kanpotar.y
        );
    }
}

export function generateObstacle(canvasWidth, canvasHeight) {
    const type = Math.random() > 0.5 ? "green" : "red";
    const isFloating = Math.random() > 0.5;
    const x = canvasWidth;
    const y = isFloating ? canvasHeight - 200 : canvasHeight - 100;
    const width = 50;
    const height = 50;
    const speed = 5;

    return new Obstacle(x, y, width, height, speed, type);
}
