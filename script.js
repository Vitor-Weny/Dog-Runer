const dog = document.getElementById("dog");
const cactus = document.getElementById("cactus");

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    if (!dog.classList.contains("jump")) {
      dog.classList.add("jump");
      setTimeout(() => {
        dog.classList.remove("jump");
      }, 500);
    }
  }
});

setInterval(function () {
  const dogTop = parseInt(window.getComputedStyle(dog).getPropertyValue("top"));
  const cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

  if (cactusLeft < 90 && cactusLeft > 50 && dogTop >= 140) {
    alert("💥 Você perdeu! 🐶");
    location.reload();
  }
}, 10);
