// ========== Memory Game Logic with Ultra Stylish Animations ==========

let baseEmojis = [
    '🍎', '🚗', '🐶', '🎈', '🍕', '🌟', '🎮', '🏀',
    '🐱', '🌍', '🍔', '✈️', '🎵', '🛒', '🍩', '📚',
    '🚀', '🎨', '💎', '🎁', '🐟', '🏰', '🎤', '🛡️',
    '🦄', '📸', '📱', '🧩', '⚽', '🥇', '🐯', '🧸'
];

let cards = [];
let level = 1;
let points = 0;
let matchedPairs = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const gameBoard = document.getElementById('memory-game');
const pointsDisplay = document.getElementById('points-value');
const levelDisplay = document.getElementById('current-level');
const scoreDisplay = document.getElementById('current-score');
const gameMessage = document.getElementById('game-message');
const nextLevelBtn = document.getElementById('next-level-btn');
const prevLevelBtn = document.getElementById('prev-level-btn');

// Save and Load progress
function saveProgress() {
    localStorage.setItem('memoryGamePoints', points);
    localStorage.setItem('memoryGameLevel', level);
}

function loadProgress() {
    const savedPoints = localStorage.getItem('memoryGamePoints');
    const savedLevel = localStorage.getItem('memoryGameLevel');
    if (savedPoints !== null) points = parseInt(savedPoints, 10);
    if (savedLevel !== null) level = parseInt(savedLevel, 10);
}

// Grid setup
function getGridSetup(level) {
    if (level === 1) return { rows: 2, cols: 2 };
    if (level === 2) return { rows: 2, cols: 3 };
    if (level === 3) return { rows: 3, cols: 4 };
    if (level === 4) return { rows: 4, cols: 4 };
    if (level === 5) return { rows: 4, cols: 5 };
    if (level === 6) return { rows: 5, cols: 6 };
    return { rows: 6, cols: 6 };
}

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function startGame() {
    gameBoard.innerHTML = "";
    matchedPairs = 0;
    lockBoard = false;
    firstCard = null;
    secondCard = null;

    gameMessage.classList.add('hidden');
    nextLevelBtn.classList.add('hidden');
    prevLevelBtn.classList.add('hidden');

    const { rows, cols } = getGridSetup(level);
    const totalCards = rows * cols;
    const neededPairs = totalCards / 2;

    const selectedEmojis = shuffle([...baseEmojis]).slice(0, neededPairs);
    cards = shuffle([...selectedEmojis, ...selectedEmojis]);

    gameBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        card.innerHTML = `
            <div class="front">❓</div>
            <div class="back">${emoji}</div>
        `;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });

    updateScoreBoard();
}

// Flip card
function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains('match')) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Check match
function checkForMatch() {
    const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
    isMatch ? handleMatch() : handleWrong();
}

function handleMatch() {
    points += 1;
    matchedPairs += 1;
    updateScoreBoard();
  
    // Remove front question mark and show emoji permanently
    firstCard.querySelector('.front').textContent = firstCard.dataset.emoji;
    secondCard.querySelector('.front').textContent = secondCard.dataset.emoji;
  
    firstCard.classList.add('match');
    secondCard.classList.add('match');
  
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  
    resetBoard();
  
    const totalPairs = cards.length / 2;
    if (matchedPairs === totalPairs) {
      points += 5;
      updateScoreBoard();
      setTimeout(() => {
        showConfetti();
        gameMessage.classList.remove('hidden');
        nextLevelBtn.classList.remove('hidden');
        prevLevelBtn.classList.remove('hidden');
        onLevelComplete();
      }, 500);
    }
  }
  

function handleWrong() {
    lockBoard = true;
    firstCard.classList.add('wrong');
    secondCard.classList.add('wrong');

    if (navigator.vibrate) navigator.vibrate(100);

    setTimeout(() => {
        firstCard.classList.remove('flipped', 'wrong');
        secondCard.classList.remove('flipped', 'wrong');
        resetBoard();
    }, 900);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function updateScoreBoard() {
    pointsDisplay.textContent = getMainPoints().toString().padStart(3, '0');
    levelDisplay.textContent = level;
    scoreDisplay.textContent = points;
    saveProgress();
}

// Points system
function onLevelComplete() {
    let currentPoints = getMainPoints();
    currentPoints += 20;
    localStorage.setItem('points', currentPoints);
}

function getMainPoints() {
    const saved = localStorage.getItem('points');
    return saved ? parseInt(saved) : 0;
}

// Next/Prev Buttons
nextLevelBtn.addEventListener('click', () => {
    level++;
    startGame();
});

prevLevelBtn.addEventListener('click', () => {
    if (level > 1) {
        level--;
        startGame();
    }
});

// Confetti
function showConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.classList.add('fixed', 'top-0', 'left-0', 'w-full', 'h-full', 'pointer-events-none', 'overflow-hidden', 'z-50');
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 180; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'particle';
        confetti.style.width = Math.random() > 0.5 ? '6px' : '10px';
        confetti.style.height = confetti.style.width;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.backgroundColor = randomColor();
        confetti.style.position = 'absolute';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = Math.random() * -20 + 'vh';
        confetti.style.opacity = '0.8';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
        confettiContainer.remove();
    }, 4000);
}

function randomColor() {
    const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#845EC2', '#F9C80E', '#EA3546'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Reset Game
function resetGame() {
    points = 0; 
    level = 1;
    matchedPairs = 0;
  
    localStorage.setItem('points', 0); // Yeh zaruri hai taaki storage me bhi points reset ho
    updateScoreBoard();
    startGame();
  
    // Home page ke points reset karo
    const pointsValue = document.getElementById('points-value');
    if (pointsValue) {
      pointsValue.textContent = '000';
    }
  }
  
  


// Start
loadProgress();
startGame();
