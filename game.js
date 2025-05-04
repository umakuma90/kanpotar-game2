import { Kanpotar } from './kanpotar.js';
import { Obstacle, generateObstacle } from './obstacles.js';
import { Enemy } from './enemy.js';
import { Bullet, createBullet } from './bullets.js';
import { UI } from './ui.js';


const canvas = document.getElementById('gameCanvas');
console.log(canvas); // Esto debería mostrar el elemento <canvas> en la consola.
const ctx = canvas.getContext('2d');
	
// Instancias de los módulos
let kanpotar = new Kanpotar(canvas);
let obstacles = [];
let enemy = null;
let bullets = [];
let gamePaused = false;
let gameOver = false;
let obstacleInterval = 2000;
let lastObstacleTime = 0;

function resetGame() {
    kanpotar = new Kanpotar(canvas);
    obstacles = [];
    enemy = null;
    bullets = [];
    gamePaused = false;
    gameOver = false;
    lastObstacleTime = 0;
}

function updateGame(timestamp) {
    if (gamePaused || gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Actualizar Kanpotar
    kanpotar.update();

    // Generar obstáculos
    if (!enemy && timestamp - lastObstacleTime > obstacleInterval) {
        obstacles.push(generateObstacle(canvas.width, canvas.height));
        lastObstacleTime = timestamp;
    }

    // Actualizar obstáculos
    obstacles = obstacles.filter(obstacle => {
        obstacle.update();
        if (obstacle.checkCollision(kanpotar)) {
            if (obstacle.type === 'green' && kanpotar.isPunching) {
                kanpotar.score += 10;
                return false; // Eliminar obstáculo verde golpeado
            } else if (obstacle.type === 'red') {
                kanpotar.lives--;
                if (kanpotar.lives === 0) {
                    gameOver = true;
                }
                return false; // Eliminar obstáculo rojo tras colisión
            }
        }
        return !obstacle.isOutOfBounds(canvas.width);
    });

    // Actualizar enemigo
    if (enemy) {
        enemy.update();
        if (enemy.lives <= 0) {
            enemy = null;
            obstacleInterval *= 0.97; // Aumentar velocidad de obstáculos
        }
    } else if (kanpotar.score > 0 && kanpotar.score % 30 === 0) {
        enemy = new Enemy(canvas.width, canvas.height);
    }

    // Actualizar balas
    bullets = bullets.filter(bullet => {
        bullet.update();
        if (bullet.checkCollision(kanpotar)) {
            kanpotar.lives--;
            if (kanpotar.lives === 0) {
                gameOver = true;
            }
            return false;
        }
        return !bullet.isOutOfBounds(canvas.width);
    });

    // Dibujar elementos
    kanpotar.draw(ctx);
    obstacles.forEach(obstacle => obstacle.draw(ctx));
    if (enemy) enemy.draw(ctx);
    bullets.forEach(bullet => bullet.draw(ctx));
    UI.drawLives(ctx, kanpotar.lives, canvas.width);
    UI.drawScore(ctx, kanpotar.score);
    if (enemy) UI.drawEnemyLives(ctx, enemy.lives, canvas.width);

    if (!gameOver) requestAnimationFrame(updateGame);
    else UI.drawGameOver(ctx, kanpotar.score, canvas.width, canvas.height);
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyP') gamePaused = !gamePaused;
    if (e.code === 'KeyR' && gameOver) resetGame();
});

requestAnimationFrame(updateGame);

