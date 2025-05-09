const allWords = [
  "apple", "banana", "orange", "grape", "watermelon", "kiwi", "cherry", "mango", "pear", "peach",
  "pen", "book", "laptop", "mouse", "bottle", "chair", "desk", "bag", "board", "clock",
  "sun", "moon", "star", "cloud", "rain", "wind", "snow", "storm", "fog", "lightning",
  "dog", "cat", "bird", "fish", "tiger", "lion", "elephant", "monkey", "zebra", "horse",
  "red", "blue", "green", "yellow", "pink", "black", "white", "purple", "brown", "orange",
  "run", "jump", "swim", "read", "write", "sing", "dance", "play", "cook", "draw",
  "carrot", "broccoli", "spinach", "potato", "onion", "tomato", "pumpkin", "pepper", "lettuce", "corn",
  "train", "bus", "car", "bike", "truck", "boat", "plane", "jeep", "scooter", "subway",
  "India", "China", "Japan", "Russia", "Brazil", "Germany", "France", "Italy", "Egypt", "Kenya",
  "happy", "sad", "angry", "excited", "tired", "scared", "proud", "shy", "funny", "kind"
];

let currentLevel = 1;
let score = 0;
let correctAnswers = 0;
let currentWords = [];
let currentWordIndex = 0;

const emojis = ["🎉", "👍", "😄", "🌟", "🔥", "👏", "😁"];
const feedbackWords = ["Awesome!", "You nailed it!", "Great job!", "Well done!", "Perfect!", "Excellent!"];

const levelDisplay = document.getElementById("level");
const scoreDisplay = document.getElementById("score");
const wordDisplay = document.getElementById("word");
const feedbackDisplay = document.getElementById("feedback");
const nextLevelBtn = document.getElementById("nextLevelBtn");
const resetBtn = document.getElementById("resetBtn");
const speakBtn = document.getElementById("speakBtn");

function getWordsForLevel(level) {
  const start = (level - 1) * 10;
  return allWords.slice(start, start + 10);
}

function updateGame() {
  currentWords = getWordsForLevel(currentLevel);
  currentWordIndex = 0;
  correctAnswers = 0;
  wordDisplay.textContent = currentWords[currentWordIndex];
  levelDisplay.textContent = `Level: ${currentLevel} / 20`;
  scoreDisplay.textContent = `Score: ${score}`;
  feedbackDisplay.textContent = "";
  nextLevelBtn.style.display = "none";
}

function speakWord() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  feedbackDisplay.textContent = "🎧 Listening...";
  recognition.start();

  recognition.onresult = (event) => {
    const spoken = event.results[0][0].transcript.toLowerCase();
    const expected = currentWords[currentWordIndex].toLowerCase();

    if (spoken === expected) {
      score += 10;
      correctAnswers++;
      const randomMsg = feedbackWords[Math.floor(Math.random() * feedbackWords.length)];
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      feedbackDisplay.textContent = `${randomMsg} ${emoji}`;
      scoreDisplay.textContent = `Score: ${score}`;

      if (correctAnswers >= 10) {
        nextLevelBtn.style.display = "inline-block";
        feedbackDisplay.textContent += " 🎊 Level Complete!";
        showConfetti();
      } else {
        currentWordIndex++;
        setTimeout(() => {
          wordDisplay.textContent = currentWords[currentWordIndex];
          feedbackDisplay.textContent = "";
        }, 1000);
      }
    } else {
      feedbackDisplay.textContent = "❌ Try again!";
    }
  };

  recognition.onerror = () => {
    feedbackDisplay.textContent = "Error! Try again.";
  };
}

function goToNextLevel() {
  if (currentLevel < 20) {
    currentLevel++;
    updateGame();
  } else {
    feedbackDisplay.textContent = "🏁 All levels completed!";
    nextLevelBtn.style.display = "none";
  }
}

function resetGame() {
  currentLevel = 1;
  score = 0;
  updateGame();
}

speakBtn.addEventListener("click", speakWord);
nextLevelBtn.addEventListener("click", goToNextLevel);
resetBtn.addEventListener("click", resetGame);

updateGame();

// 🎊 Confetti effect
function showConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let confetti = [];

  for (let i = 0; i < 100; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 40 + 10,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.random() * 10 - 10,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((c) => {
      ctx.beginPath();
      ctx.lineWidth = c.r / 2;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt, c.y);
      ctx.lineTo(c.x + c.tilt + c.r, c.y + c.r);
      ctx.stroke();
    });
    update();
  }

  function update() {
    for (let i = 0; i < confetti.length; i++) {
      confetti[i].y += Math.cos(confetti[i].d) + 3;
      confetti[i].tilt = Math.sin(confetti[i].y / 60) * 15;

      if (confetti[i].y > canvas.height) {
        confetti[i].y = -10;
        confetti[i].x = Math.random() * canvas.width;
      }
    }
  }

  let duration = 2000;
  let frame = 0;

  function animate() {
    draw();
    frame++;
    if (frame * 16 < duration) requestAnimationFrame(animate);
  }

  animate();
}
