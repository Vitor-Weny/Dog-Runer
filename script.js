const dog = document.getElementById("dog");
const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");

let score = 0;
let gameOver = false;

const dogWidth = 44;
const dogHeight = 44;
const obstacleWidth = 32; // tamanho aproximado do emoji 🌵 no jogo
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

    // Posição do dog e do obstáculo em px dentro do game
    const dogLeft = parseInt(window.getComputedStyle(dog).getPropertyValue("left"));
    const dogBottom = parseInt(window.getComputedStyle(dog).getPropertyValue("bottom"));
    const obstacleLeft = position;
    const obstacleBottom = 10; // sempre 10px do chão

    // Hitbox reduzida para obstáculo (2px de margem)
    const obstacleHitboxLeft = obstacleLeft + 2;
    const obstacleHitboxRight = obstacleLeft + obstacleWidth - 2;
    const obstacleHitboxTop = obstacleBottom + obstacleHeight - 2;
    const obstacleHitboxBottom = obstacleBottom + 2;

    // Hitbox do dog
    const dogHitboxLeft = dogLeft;
    const dogHitboxRight = dogLeft + dogWidth;
    const dogHitboxTop = dogBottom + dogHeight;
    const dogHitboxBottom = dogBottom;

    // Colisão AABB (axis-aligned bounding box)
    const collided = !(
      dogHitboxRight < obstacleHitboxLeft ||
      dogHitboxLeft > obstacleHitboxRight ||
      dogHitboxTop < obstacleHitboxBottom ||
      dogHitboxBottom > obstacleHitboxTop
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
