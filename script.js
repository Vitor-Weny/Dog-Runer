const dog = document.getElementById("dog");
const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");
const speedBtn = document.getElementById("speedBtn");

let score = 0;
let gameOver = false;
let jumping = false;
let speed = 8; // velocidade inicial

function jump() {
  if (jumping) return;
  jumping = true;
  dog.classList.add("jump");
  setTimeout(() => {
    dog.classList.remove("jump");
    jumping = false;
  }, 500);
}

document.addEventListener("keydown", e => {
  if (e.code === "Space") jump();
});
document.addEventListener("touchstart", e => {
  e.preventDefault();
  jump();
}, { passive: false });

speedBtn.addEventListener("click", () => {
  speed += 2;
  speedBtn.textContent = `Velocidade: ${speed}`;
});

function getSizes() {
  const gameWidth = game.clientWidth;
  const dogWidth = gameWidth > 600 ? 44 : 36;
  const dogHeight = gameWidth > 600 ? 44 : 36;
  const obstacleWidth = gameWidth > 600 ? 32 : 36;
  const obstacleHeight = gameWidth > 600 ? 44 : 36;
  return { dogWidth, dogHeight, obstacleWidth, obstacleHeight };
}

function createObstacle() {
  if (gameOver) return;

  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  obstacle.textContent = "🌵";

  let position = game.clientWidth;
  obstacle.style.left = position + "px";
  game.appendChild(obstacle);

  const moveInterval = setInterval(() => {
    if (gameOver) {
      clearInterval(moveInterval);
      return;
    }

    position -= speed;
    obstacle.style.left = position + "px";

    const { dogWidth, dogHeight, obstacleWidth, obstacleHeight } = getSizes();

    const dogLeft = parseInt(window.getComputedStyle(dog).getPropertyValue("left"));
    const dogBottom = parseInt(window.getComputedStyle(dog).getPropertyValue("bottom"));
    const obstacleLeft = position;
    const obstacleBottom = 10;

    const dogHitbox = {
      left: dogLeft,
      right: dogLeft + dogWidth,
      bottom: dogBottom,
      top: dogBottom + dogHeight,
    };

    const obstacleHitbox = {
      left: obstacleLeft,
      right: obstacleLeft + obstacleWidth,
      bottom: obstacleBottom,
      top: obstacleBottom + obstacleHeight,
    };

    const collided = !(
      dogHitbox.right < obstacleHitbox.left ||
      dogHitbox.left > obstacleHitbox.right ||
      dogHitbox.top < obstacleHitbox.bottom ||
      dogHitbox.bottom > obstacleHitbox.top
    );

    if (collided) {
      clearInterval(moveInterval);
      gameOver = true;
      alert(`💥 Você perdeu! Pontuação: ${score}`);
      location.reload();
    }

    if (position < -obstacleWidth) {
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
