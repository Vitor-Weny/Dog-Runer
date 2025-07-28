
const dog = document.getElementById("dog");
const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");

let score = 0;
let gameOver = false;

// Pulo com espaço
document.addEventListener("keydown", function (event) {
  if (event.code === "Space" && !dog.classList.contains("jump")) {
    dog.classList.add("jump");
    setTimeout(() => {
      dog.classList.remove("jump");
    }, 500);
  }
});

// Criar obstáculo
function createObstacle() {
  if (gameOver) return;

  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  obstacle.textContent = "🐕";

  let position = 600;
  obstacle.style.left = position + "px";
  game.appendChild(obstacle);

  const moveInterval = setInterval(() => {
    if (gameOver) {
      clearInterval(moveInterval);
      return;
    }

    position -= 5;
    obstacle.style.left = position + "px";

    // Colisão
    const dogTop = parseInt(window.getComputedStyle(dog).getPropertyValue("bottom"));
    if (position > 50 && position < 94 && dogTop < 44) {
      clearInterval(moveInterval);
      gameOver = true;
      alert("💥 Você perdeu! Pontuação: " + score);
      location.reload();
    }

    // Saiu da tela
    if (position < -50) {
      clearInterval(moveInterval);
      obstacle.remove();
    }
  }, 20);

  // Próximo obstáculo entre 1s e 2s
  setTimeout(createObstacle, Math.random() * 1000 + 1000);
}

// Pontuação
setInterval(() => {
  if (!gameOver) {
    score++;
    scoreDisplay.textContent = score;
  }
}, 100);

// Iniciar
createObstacle();
