const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");
const message = document.getElementById("message");

// "Nein"-Button bewegt sich weg
function moveNoButton() {
  const x = Math.random() * 80 - 40;
  const y = Math.random() * 80 - 40;
  noButton.style.transform = `translate(${x}px, ${y}px)`;
}

noButton.addEventListener("mouseover", moveNoButton);
noButton.addEventListener("touchstart", moveNoButton);

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
