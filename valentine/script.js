const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");
const message = document.getElementById("message");

// ---------------- Startposition von "Nein" neben "Ja" ----------------
function setInitialNoPosition() {
  // Relative Position zurücksetzen
  noButton.style.position = "absolute";

  // Hole die aktuelle Position vom Layout
  const rectYes = yesButton.getBoundingClientRect();
  const rectContainer = document.querySelector(".buttons").getBoundingClientRect();

  // Position relativ zum Container
  noButton.style.left = `${rectYes.right - rectContainer.left + 15}px`;
  noButton.style.top = `${rectYes.top - rectContainer.top}px`;
}

// sicherstellen, dass die Funktion erst nach vollständigem Laden läuft
window.addEventListener("load", setInitialNoPosition);


// ---------------- Springender "Nein"-Button ----------------
function moveNoButton(event) {
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

  // Wenn Maus nahe kommt, springen
  if (distance < 150) {
    // Berechne neue Position innerhalb des sichtbaren Bereichs
    const padding = 10; // Abstand zum Rand
    const randomX = Math.min(
      viewportWidth - btnWidth - padding,
      Math.max(padding, Math.random() * (viewportWidth - btnWidth))
    );
    const randomY = Math.min(
      viewportHeight - btnHeight - padding,
      Math.max(padding, Math.random() * (viewportHeight - btnHeight))
    );

    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;

    // Leichte Rotation und Skalierung
    const rotate = (Math.random() * 20) - 10; // weniger extrem
    const scale = 0.9 + Math.random() * 0.2;  // 0.9 - 1.1
    noButton.style.transform = `rotate(${rotate}deg) scale(${scale})`;
  }
}

noButton.addEventListener("mousemove", moveNoButton);
noButton.addEventListener("touchstart", e => moveNoButton(e.touches[0]));

// ---------------- Klick auf "Ja" ----------------
yesButton.addEventListener("click", () => {
  document.querySelector(".buttons").style.display = "none";
  message.style.display = "block";
});

