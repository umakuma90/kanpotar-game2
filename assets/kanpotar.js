export class Kanpotar {
    constructor(canvas) {
        if (!canvas || !canvas.height) {
            throw new Error('Canvas no está definido o carece de dimensiones.');
        }
        this.x = 100;
        this.y = canvas.height - 100;
        this.width = 80;
        this.height = 100;
        this.groundY = canvas.height - 100;

        // Propiedades de movimiento
        this.speed = 5;
        this.vy = 0;
        this.gravity = 0.5;

        // Estados
        this.isJumping = false;
        this.isCrouching = false;
        this.isPunching = false;
        this.groundY = canvas.height - 100;

        // Vidas y puntuación
        this.lives = 3;
        this.score = 0;

        // Carga de imágenes para animaciones
        this.images = {
            correr1: new Image(),
            correr2: new Image(),
            agachado: new Image(),
            golpear: new Image(),
            corazon: new Image()
        };
        this.images.correr1.src = 'assets/kanpotar-correr1.png';
        this.images.correr2.src = 'assets/kanpotar-correr2.png';
        this.images.agachado.src = 'assets/kanpotar-agachado.png';
        this.images.golpear.src = 'assets/kanpotar-golpear.png';
        this.images.corazon.src = 'assets/corazon-kanpotar.png';

        // Animaciones
        this.animationTimer = 0;
        this.currentFrame = 0;

        // Configurar teclas
        this.setKeyboardListeners();
    }

    setKeyboardListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') this.jump();
            if (e.code === 'ArrowDown') this.isCrouching = true;
            if (e.code === 'KeyA') this.punch();
            if (e.code === 'ArrowRight') this.move('right');
            if (e.code === 'ArrowLeft') this.move('left');
        });

        document.addEventListener('keyup', (e) => {
            if (e.code === 'ArrowDown') this.isCrouching = false;
        });
    }

    jump() {
        if (!this.isJumping && !this.isCrouching) {
            this.vy = -10;
            this.isJumping = true;
        }
    }

    punch() {
        this.isPunching = true;
        setTimeout(() => this.isPunching = false, 300);
    }

    move(direction) {
        if (direction === 'right') this.x += this.speed;
        if (direction === 'left') this.x -= this.speed;
    }

    update() {
        // Gravedad y salto
        this.y += this.vy;
        this.vy += this.gravity;

        if (this.y >= this.groundY) {
            this.y = this.groundY;
            this.isJumping = false;
        }

        // Animaciones de correr
        this.animationTimer++;
        if (this.animationTimer > 15) {
            this.currentFrame = (this.currentFrame + 1) % 2;
            this.animationTimer = 0;
        }
    }

    draw(ctx) {
        let imageToDraw;
        if (this.isPunching) {
            imageToDraw = this.images.golpear;
        } else if (this.isCrouching) {
            imageToDraw = this.images.agachado;
        } else {
            imageToDraw = this.currentFrame === 0 ? this.images.correr1 : this.images.correr2;
        }

        ctx.drawImage(imageToDraw, this.x, this.y, this.width, this.height);

        // Dibujar vidas (corazones)
        for (let i = 0; i < this.lives; i++) {
            ctx.drawImage(this.images.corazon, 10 + i * 30, 40, 25, 25);
        }

        // Dibujar puntuación
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(`Puntuación: ${this.score}`, 10, 30);
    }
}
