const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");
const message = document.getElementById("message");

// "Nein"-Button bewegt sich weg extrem
function moveNoButtonExtreme(event) {
  const rect = noButton.getBoundingClientRect();
  const btnX = rect.left + rect.width / 2;
  const btnY = rect.top + rect.height / 2;

  const cursorX = event.clientX;
  const cursorY = event.clientY;

  // Abstand zwischen Cursor und Button-Zentrum
  const dx = btnX - cursorX;
  const dy = btnY - cursorY;
  const distance = Math.sqrt(dx*dx + dy*dy);

  // Je näher der Cursor, desto stärker die Bewegung
  const maxDistance = 200; // ab hier reagiert der Button
  const intensity = Math.max(0, maxDistance - distance) / maxDistance;

  // Extremere Bewegungsreichweite
  const moveX = (Math.random() * 200 - 100) * intensity;
  const moveY = (Math.random() * 200 - 100) * intensity;

  noButton.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

// Maus-Events
noButton.addEventListener("mousemove", moveNoButtonExtreme);

// Touch-Events für mobile
noButton.addEventListener("touchstart", (e) => moveNoButtonExtreme(e.touches[0]));

// "Ja"-Button Klick
yesButton.addEventListener("click", () => {
  document.querySelector(".buttons").style.display = "none";
  message.style.display = "block";

  // Emojis explodieren
  document.querySelectorAll(".emoji").forEach(emoji => {
    emoji.style.animation = "explode 1s forwards";
  });

  // Confetti hinzufügen
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
