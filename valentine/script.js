const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");
const message = document.getElementById("message");

// "Nein"-Button springt random über die ganze Website
function jumpNoButton(event) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Berechne Button-Größe
  const rect = noButton.getBoundingClientRect();
  const btnWidth = rect.width;
  const btnHeight = rect.height;

  // Cursor Position
  const cursorX = event.clientX;
  const cursorY = event.clientY;

  // Button-Zentrum
  const btnX = rect.left + rect.width / 2;
  const btnY = rect.top + rect.height / 2;

  // Abstand Cursor <-> Button
  const dx = btnX - cursorX;
  const dy = btnY - cursorY;
  const distance = Math.sqrt(dx*dx + dy*dy);

  // Wenn der Cursor zu nah ist (<150px), springe
  if (distance < 150) {
    const maxX = viewportWidth - btnWidth - 20; // Padding
    const maxY = viewportHeight - btnHeight - 20;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noButton.style.transform = `translate(${randomX - rect.left}px, ${randomY - rect.top}px)`;
  }
}

// Events
noButton.addEventListener("mousemove", jumpNoButton);
noButton.addEventListener("touchstart", (e) => jumpNoButton(e.touches[0]));

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
