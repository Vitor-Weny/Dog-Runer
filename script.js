const dog = document.getElementById("dog");
const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");

let score = 0;
let gameOver = false;

const dogWidth = 44;      // largura do emoji cachorro (igual ao CSS)
const dogHeight = 44;     // altura do emoji cachorro
const obstacleWidth = 32; // largura aproximada do emoji cacto
const obstacleHeight = 44;

function jump() {
  if (!dog.classList.contains("jump")) {
    dog.classList.add("jump");
    setTimeout(() => {
      dog.classList.remove("jump");
    }, 500);
  }
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") jump();
});

document.addEventListener("touchstart", () => {
  jump();
});

function createObstacle() {
  if (gameOver) return;

  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  obstacle.textContent = "🌵";

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

    // Pegando posições dentro do container (valores CSS)
    const dogLeft = parseInt(window.getComputedStyle(dog).getPropertyValue("left"));
    const dogBottom = parseInt(window.getComputedStyle(dog).getPropertyValue("bottom"));
    const obstacleLeft = position;
    const obstacleBottom = 10; // fixo no chão

    // Hitbox do cachorro (exata)
    const dogHitbox = {
      left: dogLeft,
      right: dogLeft + dogWidth,
      bottom: dogBottom,
      top: dogBottom + dogHeight,
    };

    // Hitbox do cacto (exata)
    const obstacleHitbox = {
      left: obstacleLeft,
      right: obstacleLeft + obstacleWidth,
      bottom: obstacleBottom,
      top: obstacleBottom + obstacleHeight,
    };

    // Verificação de colisão AABB (exata)
    const collided = !(
      dogHitbox.right < obstacleHitbox.left ||
      dogHitbox.left > obstacleHitbox.right ||
      dogHitbox.top < obstacleHitbox.bottom ||
      dogHitbox.bottom > obstacleHitbox.top
    );

    if (collided) {
      clearInterval(moveInterval);
      gameOver = true;
      alert("💥 Você perdeu! Pontuação: " + score);
      location.reload();
    }

    if (position < -50) {
      clearInterval(moveInterval);
      obstacle.remove();
    }
  }, 20);

  setTimeout(createObstacle, Math.random() * 1000 + 1000);
}

setInterval(() => {
  if (!gameOver) {
    score++;
    scoreDisplay.textContent = score;
  }
}, 100);

createObstacle();
