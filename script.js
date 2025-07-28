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

// Criar obstáculos com emoji 🐕
function createObstacle() {
  if (gameOver) return;

  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  obstacle.textContent = "🐕";
  obstacle.style.right = "-30px";

  // Tempo aleatório entre obstáculos
  const speed = Math.random() * 2 + 2; // entre 2s e 4s
  obstacle.style.animationDuration = `${speed}s`;

  game.appendChild(obstacle);

  // Detectar colisão
  let collisionCheck = setInterval(() => {
    const obstacleLeft = obstacle.getBoundingClientRect().left;
    const dogLeft = dog.getBoundingClientRect().left;
    const dogTop = parseInt(window.getComputedStyle(dog).getPropertyValue("top"));

    if (
      obstacleLeft < dogLeft + 44 &&
      obstacleLeft > dogLeft &&
      dogTop >= 130
    ) {
      gameOver = true;
      alert("💥 Você perdeu! Pontuação: " + score);
      location.reload();
    }
  }, 10);

  // Remover o obstáculo depois que sair da tela
  obstacle.addEventListener("animationend", () => {
    obstacle.remove();
    clearInterval(collisionCheck);
  });

  // Criar o próximo obstáculo em um tempo aleatório
  setTimeout(createObstacle, Math.random() * 2000 + 1000);
}

// Sistema de pontuação
setInterval(() => {
  if (!gameOver) {
    score++;
    scoreDisplay.textContent = score;
  }
}, 100);

// Iniciar obstáculos
createObstacle();
