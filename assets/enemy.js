export class Enemy {
    constructor(canvasWidth, canvasHeight) {
        this.x = canvasWidth - 100;
        this.y = canvasHeight - 150;
        this.width = 80;
        this.height = 100;
        this.speed = 2;
        this.lives = 3;
        this.canBeDamaged = true;
        this.image = new Image();
        this.image.src = 'assets/enemy.png';
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    update() {
        // Movimiento del enemigo (si es necesario)
    }

    shoot() {
        // Lógica para disparar balas
    }
}
