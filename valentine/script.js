const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const message = document.getElementById('message');
const buttons = document.querySelector('.buttons');

// Position "No" button next to "Yes" button initially
function initNoButton() {
  const yesRect = yesButton.getBoundingClientRect();
  
  // Position No button to the right of Yes button
  noButton.style.left = `${yesRect.right + 20}px`;
  noButton.style.top = `${yesRect.top + (yesRect.height - noButton.offsetHeight) / 2}px`;
}

// Move "No" button to random position on viewport
function moveNoButton(event) {
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
  
  // If cursor is close, move the button to random position
  if (distance < 120) {
    const padding = 20;
    const maxX = window.innerWidth - noButton.offsetWidth - padding;
    const maxY = window.innerHeight - noButton.offsetHeight - padding;
    
    // Generate random position anywhere on screen
    const newX = padding + Math.random() * (maxX - padding);
    const newY = padding + Math.random() * (maxY - padding);
    
    noButton.style.left = `${newX}px`;
    noButton.style.top = `${newY}px`;
  }
}

// Create emoji rain effect
function createEmojiRain() {
  const emojis = ['🌸', '🌺', '💕', '✨', '🌹', '💖'];
  
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const emoji = document.createElement('div');
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.position = 'fixed';
      emoji.style.left = Math.random() * 100 + 'vw';
      emoji.style.top = '-50px';
      emoji.style.fontSize = (20 + Math.random() * 20) + 'px';
      emoji.style.opacity = '0.8';
      emoji.style.pointerEvents = 'none';
      emoji.style.zIndex = '9999';
      
      document.body.appendChild(emoji);
      
      // Animate falling
      let pos = -50;
      const speed = 2 + Math.random() * 3;
      const drift = (Math.random() - 0.5) * 2;
      let currentLeft = parseFloat(emoji.style.left);
      
      const fall = setInterval(() => {
        pos += speed;
        currentLeft += drift * 0.1;
        emoji.style.top = pos + 'px';
        emoji.style.left = currentLeft + 'vw';
        
        if (pos > window.innerHeight) {
          clearInterval(fall);
          emoji.remove();
        }
      }, 20);
    }, i * 50);
  }
}

// Handle "Yes" button click
yesButton.addEventListener('click', () => {
  noButton.classList.add('hidden');
  message.classList.remove('hidden');
  createEmojiRain();
});

// Handle "No" button hover/touch
noButton.addEventListener('mouseenter', moveNoButton);
noButton.addEventListener('mousemove', moveNoButton);
noButton.addEventListener('touchstart', (e) => {
  e.preventDefault();
  moveNoButton(e);
});
noButton.addEventListener('touchmove', (e) => {
  e.preventDefault();
  moveNoButton(e);
});

// Initialize on load
window.addEventListener('load', () => {
  // Small delay to ensure layout is ready
  setTimeout(initNoButton, 100);
});

window.addEventListener('resize', initNoButton);