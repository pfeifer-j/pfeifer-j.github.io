// ---------------- Elemente ----------------
const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");
const message = document.getElementById("message");
const emojisContainer = document.getElementById("emojis");

// ---------------- Startposition von "Nein" neben "Ja" ----------------
function setInitialNoPosition() {
  const rectYes = yesButton.getBoundingClientRect();
  noButton.style.left = `${rectYes.right + 10}px`;
  noButton.style.top = `${rectYes.top}px`;
}
window.addEventListener("load", setInitialNoPosition);

// ---------------- Extrem springender "Nein"-Button ----------------
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

  if (distance < 200) {
    if (!noButton.classList.contains("fixed")) noButton.classList.add("fixed");

    const randomX = Math.random() * (viewportWidth - btnWidth);
    const randomY = Math.random() * (viewportHeight - btnHeight);

    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;

    const rotate = (Math.random() * 60) - 30;
    const scale = 0.8 + Math.random() * 0.6;
    noButton.style.transform = `rotate(${rotate}deg) scale(${scale})`;
  }
}
noButton.addEventListener("mousemove", extremeNoButton);
noButton.addEventListener("touchstart", e => extremeNoButton(e.touches[0]));

// ---------------- Klick auf "Ja" ----------------
yesButton.addEventListener("click", () => {
  document.querySelector(".buttons").style.display = "none";
  message.style.display = "block";

  // Explodierende Emojis
  document.querySelectorAll(".emoji").forEach(emoji => {
    emoji.style.animation = "explode 1s forwards";
  });

  // Confetti
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

// ---------------- Emojis generieren ----------------
const emojiList = [
  "🐬","🐢","🐬","🐢","🐬","🐢","🐬","🐢","🐬","🐢",
  "🌸","🌺","💐","🌹","🥀","🌷","🌻","🌼","🌱","💖"
];

emojiList.forEach(e => {
  const div = document.createElement("div");
  div.className = "emoji";
  div.textContent = e;

  // Zufällige Größe, Farbe, Bewegung
  div.style.setProperty("--size", Math.random());
  div.style.setProperty("--speed", Math.random());
  div.style.setProperty("--x1", `${(Math.random()-0.5)*100}px`);
  div.style.setProperty("--y1", `${(Math.random()-0.5)*100}px`);
  div.style.setProperty("--x2", `${(Math.random()-0.5)*100}px`);
  div.style.setProperty("--y2", `${(Math.random()-0.5)*100}px`);
  div.style.setProperty("--x3", `${(Math.random()-0.5)*100}px`);
  div.style.setProperty("--y3", `${(Math.random()-0.5)*100}px`);

  // Zufälliger Startpunkt
  div.style.left = `${Math.random() * 90}vw`;
  div.style.top = `${Math.random() * 90}vh`;

  emojisContainer.appendChild(div);
});
