const dog = document.getElementById("dog");
const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");

let score = 0;
let gameOver = false;

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

    const dogRect = dog.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    // Hitbox bem pequena: só 2px margem dentro do cacto
    const obstacleHitbox = {
      left: obstacleRect.left + 2,
      right: obstacleRect.right - 2,
      top: obstacleRect.top + 2,
      bottom: obstacleRect.bottom - 2,
    };

    const collided = !(
      dogRect.right < obstacleHitbox.left ||
      dogRect.left > obstacleHitbox.right ||
      dogRect.bottom < obstacleHitbox.top ||
      dogRect.top > obstacleHitbox.bottom
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
