export class Bullet {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.speed = speed;
        this.image = new Image();
        this.image.src = 'assets/bullet.png';
    }

    update() {
        this.x -= this.speed; // Las balas se mueven hacia la izquierda
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    isOutOfBounds(canvasWidth) {
        return this.x + this.width < 0; // Fuera de los límites del canvas
    }

    checkCollision(kanpotar) {
        // Detectar colisión con Kanpotar
        return (
            this.x < kanpotar.x + kanpotar.width &&
            this.x + this.width > kanpotar.x &&
            this.y < kanpotar.y + kanpotar.height &&
            this.y + this.height > kanpotar.y
        );
    }
}

export function createBullet(enemy) {
    // Crear una bala en la posición del enemigo
    return new Bullet(enemy.x, enemy.y + enemy.height / 2, 7);
}