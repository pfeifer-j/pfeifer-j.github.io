const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const message = document.getElementById('message');
const buttons = document.querySelector('.buttons');

// Track if "No" button has been moved
let noButtonMoved = false;

// Initialize "No" button position
function initNoButton() {
  const buttonsRect = buttons.getBoundingClientRect();
  const yesRect = yesButton.getBoundingClientRect();
  
  noButton.style.left = `${yesRect.right - buttonsRect.left + 20}px`;
  noButton.style.top = '0px';
}

// Move "No" button away from cursor
function moveNoButton(event) {
  if (!noButtonMoved) {
    noButtonMoved = true;
  }
  
  const buttonsRect = buttons.getBoundingClientRect();
  const noRect = noButton.getBoundingClientRect();
  
  // Get cursor position
  const cursorX = event.clientX || event.touches?.[0]?.clientX;
  const cursorY = event.clientY || event.touches?.[0]?.clientY;
  
  // Calculate distance from cursor to button center
  const buttonCenterX = noRect.left + noRect.width / 2;
  const buttonCenterY = noRect.top + noRect.height / 2;
  
  const dx = buttonCenterX - cursorX;
  const dy = buttonCenterY - cursorY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // If cursor is close, move the button
  if (distance < 100) {
    // Calculate available space
    const maxX = buttonsRect.width - noButton.offsetWidth;
    const maxY = 100; // Keep it within reasonable bounds
    
    // Generate random position
    const newX = Math.random() * maxX;
    const newY = (Math.random() - 0.5) * maxY;
    
    noButton.style.left = `${newX}px`;
    noButton.style.top = `${newY}px`;
  }
}

// Handle "Yes" button click
yesButton.addEventListener('click', () => {
  buttons.style.display = 'none';
  message.classList.remove('hidden');
});

// Handle "No" button hover/touch
noButton.addEventListener('mouseenter', moveNoButton);
noButton.addEventListener('mousemove', moveNoButton);
noButton.addEventListener('touchstart', (e) => {
  e.preventDefault();
  moveNoButton(e);
});

// Initialize on load
window.addEventListener('load', initNoButton);
window.addEventListener('resize', () => {
  if (!noButtonMoved) {
    initNoButton();
  }
});
