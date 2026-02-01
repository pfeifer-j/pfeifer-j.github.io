const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");
const message = document.getElementById("message");

// Startposition von "Nein" neben "Ja"
function setInitialNoPosition() {
  const rectYes = yesButton.getBoundingClientRect();
  noButton.style.left = `${rectYes.right + 10}px`;
  noButton.style.top = `${rectYes.top}px`;
}
window.addEventListener("load", setInitialNoPosition);

// Extrem springender "Nein"-Button
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

// Klick auf "Ja"
yesButton.addEventListener("click", () => {
  document.querySelector(".buttons").style.display = "none";
  message.style.display = "block";
});
