export class UI {
    static drawLives(ctx, lives, canvasWidth) {
        // Dibujar corazones para las vidas de Kanpotar
        const heartImage = new Image();
        heartImage.src = 'assets/corazon-kanpotar.png';
        for (let i = 0; i < lives; i++) {
            ctx.drawImage(heartImage, 10 + i * 30, 10, 25, 25);
        }
    }

    static drawScore(ctx, score) {
        // Dibujar la puntuación en pantalla
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(`Puntuación: ${score}`, 10, 50);
    }

    static drawEnemyLives(ctx, lives, canvasWidth) {
        // Dibujar las vidas del enemigo como corazones
        const heartImage = new Image();
        heartImage.src = 'assets/corazon-kanpotar.png';
        for (let i = 0; i < lives; i++) {
            ctx.drawImage(heartImage, canvasWidth - (i + 1) * 30, 10, 25, 25);
        }
    }

    static drawPauseMessage(ctx, canvasWidth, canvasHeight) {
        // Dibujar un mensaje de "Pausa"
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Juego en Pausa', canvasWidth / 2, canvasHeight / 2);
    }

    static drawGameOver(ctx, score, canvasWidth, canvasHeight) {
        // Dibujar el mensaje de "Game Over"
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvasWidth / 2, canvasHeight / 2 - 20);
        ctx.fillText(`Puntuación Final: ${score}`, canvasWidth / 2, canvasHeight / 2 + 20);
        ctx.fillText('Presiona R para reiniciar', canvasWidth / 2, canvasHeight / 2 + 60);
    }
}