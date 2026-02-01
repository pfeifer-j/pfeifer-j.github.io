const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");
const message = document.getElementById("message");

// Extrem springender, rotierender und wackelnder Button
function extremeNoButton(event) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const btnWidth = noButton.offsetWidth;
  const btnHeight = noButton.offsetHeight;

  const rect = noButton.getBoundingClientRect();
  const btnX = rect.left + btnWidth / 2;
  const btnY = rect.top + btnHeight / 2;

  const cursorX = event.clientX;
  const cursorY = event.clientY;

  const dx = btnX - cursorX;
  const dy = btnY - cursorY;
  const distance = Math.sqrt(dx*dx + dy*dy);

  // Je näher der Cursor, desto extremer
  if (distance < 200) {
    const randomX = Math.random() * (viewportWidth - btnWidth);
    const randomY = Math.random() * (viewportHeight - btnHeight);

    // Springen
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;

    // Rotation und Skalierung für verrückten Effekt
    const rotate = (Math.random() * 60) - 30; // -30° bis +30°
    const scale = 0.8 + Math.random() * 0.6; // 0.8x bis 1.4x
    noButton.style.transform = `translate(0,0) rotate(${rotate}deg) scale(${scale})`;
  }
}

// Mouse + Touch
noButton.addEventListener("mousemove", extremeNoButton);
noButton.addEventListener("touchstart", (e) => extremeNoButton(e.touches[0]));

// "Ja"-Button Klick bleibt gleich
yesButton.addEventListener("click", () => {
  document.querySelector(".buttons").style.display = "none";
  message.style.display = "block";

  document.querySelectorAll(".emoji").forEach(emoji => {
    emoji.style.animation = "explode 1s forwards";
  });

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor =
      `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.animationDelay = Math.random() * 2 + "s";
    document.body.appendChild(confetti);
  }
});
