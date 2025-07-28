const dog = document.getElementById("dog");
const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");

let score = 0;
let gameOver = false;

// Pulando com espaço
document.addEventListener("keydown", function (event) {
  if (event.code === "Space" && !dog.classList.contains("jump")) {
    dog.classList.add("jump");
    setTimeout(() => {
      dog.classList.remove("jump");
    }, 500);
  }
});

// Criar obstáculos 🐕 dinamicamente
function createObstacle() {
  if (gameOver) return;

  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  obstacle.textContent = "🐕";
  obstacle.style.right = "-30px";

  // posição inicial e velocidade
  let obstaclePosition = 600;
  obstacle.style.left = obstaclePosition + "px";
  game.appendChild(obstacle);

  // Movimento do obstáculo
  const moveInterval = setInterval(() => {
    if (gameOver) {
      clearInterval(moveInterval);
      return;
    }

    obstaclePosition -= 5;
    obstacle.style.left = obstaclePosition + "px";

    const dogTop = parseInt(window.getComputedStyle(dog).getPropertyValue("bottom"));
    const dogLeft = 50;
    const dogRight = 94; // 50 + 44

    const obstacleLeft = obstaclePosition;
    const obstacleRight = obstaclePosition + 30;

    if (
      obstacleLeft < dogRight &&
      obstacleRight > dogLeft &&
      dogTop < 44
    ) {
      clearInterval(moveInterval);
      gameOver = true;
      alert("💥 Você perdeu! Pontuação: " + score);
      location.reload();
    }

    if (obstaclePosition < -30) {
      clearInterval(moveInterval);
      obstacle.remove();
    }
  }, 20);

  // Próximo obstáculo aleatório
  setTimeout(createObstacle, Math.random() * 2000 + 1000);
}

// Pontuação contínua
setInterval(() => {
  if (!gameOver) {
    score++;
    scoreDisplay.textContent = score;
  }
}, 100);

// Começar o jogo
createObstacle();
