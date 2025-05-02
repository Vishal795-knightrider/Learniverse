// ========== Day/Night Mode Toggle ==========
const modeToggle = document.getElementById('modeToggle');
const body = document.body;

modeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    modeToggle.classList.remove('text-yellow-500');
    modeToggle.classList.add('text-white');
    body.classList.remove('bg-gradient-to-r', 'from-blue-100', 'via-purple-100', 'to-pink-100');
    body.classList.add('bg-gray-900');
  } else {
    modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    modeToggle.classList.remove('text-white');
    modeToggle.classList.add('text-yellow-500');
    body.classList.remove('bg-gray-900');
    body.classList.add('bg-gradient-to-r', 'from-blue-100', 'via-purple-100', 'to-pink-100');
  }
});

// ========== Points and Level Unlocking ==========
let points = 0;
const levels = [
  document.getElementById('level-1'),
  document.getElementById('level-2'),
  document.getElementById('level-3'),
  document.getElementById('level-4'),
  document.getElementById('level-5')
];
const levelStatus = document.getElementById('level-status');

function updatePointsDisplay() {
  const pointsDisplay = document.getElementById('points-display');
  if (pointsDisplay) {
    const newPointsStr = points.toString().padStart(3, '0');
    const oldPointsStr = pointsDisplay.getAttribute('data-points') || '000';

    let digitsHTML = '<div class="digits-wrapper" style="display: inline-flex; align-items: center; gap: 2px;">';
    for (let i = 0; i < newPointsStr.length; i++) {
      digitsHTML += `
        <div class="digit-container" style="height: 2rem; width: 1.5rem; overflow: hidden; position: relative;">
          <div class="digit old" style="position: absolute; top: 0; left: 0; width: 100%; transition: transform 0.5s ease;">${oldPointsStr[i]}</div>
          <div class="digit new" style="position: absolute; top: 100%; left: 0; width: 100%; transition: transform 0.5s ease;">${newPointsStr[i]}</div>
        </div>
      `;
    }
    digitsHTML += '</div>';
    pointsDisplay.innerHTML = `Points: ${digitsHTML}`;

    const oldDigits = pointsDisplay.querySelectorAll('.digit.old');
    const newDigits = pointsDisplay.querySelectorAll('.digit.new');
    requestAnimationFrame(() => {
      oldDigits.forEach(d => d.style.transform = 'translateY(-100%)');
      newDigits.forEach(d => d.style.transform = 'translateY(-100%)');
    });
    pointsDisplay.setAttribute('data-points', newPointsStr);
  }
}

function updateLevels() {
  if (points >= 0) levels[0].classList.add('unlocked');
  if (points >= 100) levels[1].classList.add('unlocked');
  if (points >= 200) levels[2].classList.add('unlocked');
  if (points >= 300) levels[3].classList.add('unlocked');
  if (points >= 400) levels[4].classList.add('unlocked');

  if (points < 100) levelStatus.textContent = "Earn 100 points to unlock Level 2!";
  else if (points < 200) levelStatus.textContent = "Earn 100 points to unlock Level 3!";
  else if (points < 300) levelStatus.textContent = "Earn 100 points to unlock Level 4!";
  else if (points < 400) levelStatus.textContent = "Earn 100 points to unlock Level 5!";
  else levelStatus.textContent = "🎉 Congratulations! All Levels Unlocked!";
}

function updateStars() {
  const levelElements = document.querySelectorAll('.level');
  levelElements.forEach(level => {
    const star = level.querySelector('.star');
    if (level.classList.contains('unlocked')) {
      star.textContent = '⭐';
      star.classList.add('star-spin');
      setTimeout(() => {
        star.classList.remove('star-spin');
      }, 20000);
    } else {
      star.textContent = '☆';
      star.classList.remove('star-spin');
      star.style.color = '#ccc';
    }
  });
}

function earnPoints(earnedPoints) {
  points += earnedPoints;
  localStorage.setItem('points', points);
  updateLevels();
  updateStars();
  updatePointsDisplay();
}

function resetPoints() {
  points = 0;
  localStorage.setItem('points', points);
  updateLevels();
  updateStars();
  updatePointsDisplay();
}

window.addEventListener('DOMContentLoaded', () => {
  const savedPoints = localStorage.getItem('points');
  points = savedPoints ? parseInt(savedPoints) : 0;
  updateLevels();
  updateStars();
  updatePointsDisplay();
});
 // You can remove this line if you don't want default 313 points

// ========== Mood Tracker ==========
const moodTracker = document.getElementById('mood-tracker');
const moodButtons = document.querySelectorAll('.mood-btn');
const moodMessage = document.getElementById('mood-message');

moodButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedMood = button.getAttribute('data-mood');
    localStorage.setItem('mood', selectedMood);

    let message = "";
    switch (selectedMood) {
      case 'happy': message = "Keep smiling and shining! 🌟"; break;
      case 'sad': message = "It's okay to feel sad. Tomorrow will be brighter. ❤️"; break;
      case 'excited': message = "Yay! Let’s have an awesome learning adventure! 🚀"; break;
      case 'angry': message = "Take a deep breath, you’re doing great! 😌"; break;
      case 'calm': message = "Peaceful minds are powerful minds. ✨"; break;
    }

    moodMessage.textContent = message;
    setTimeout(() => {
      moodTracker.classList.add('hidden');
    }, 2000);
  });
});

// ========== Login/Signup/Forgot Password System ==========
document.addEventListener('DOMContentLoaded', function () {
  const loginBtn = document.getElementById('login-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const helloName = document.getElementById('hello-name');
  const authPopup = document.getElementById('auth-popup');
  const closePopup = document.getElementById('close-popup');

  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const forgotForm = document.getElementById('forgot-form');

  const toSignup = document.getElementById('to-signup');
  const toForgot = document.getElementById('to-forgot');
  const backToLogin1 = document.getElementById('back-to-login-1');
  const backToLogin2 = document.getElementById('back-to-login-2');

  const messageArea = document.getElementById('global-message');
  const forgotMessage = document.getElementById('forgot-message');
  const loginSuccessMessage = document.getElementById('login-success-message');

  function clearMessages() {
    loginSuccessMessage.textContent = '';
    loginSuccessMessage.classList.add('hidden');
    messageArea.textContent = '';
    messageArea.classList.add('hidden');
    forgotMessage.textContent = '';
    forgotMessage.classList.add('hidden');
  }

  function showForm(formName) {
    loginForm.classList.add('hidden');
    signupForm.classList.add('hidden');
    forgotForm.classList.add('hidden');

    if (formName === 'login') loginForm.classList.remove('hidden');
    if (formName === 'signup') signupForm.classList.remove('hidden');
    if (formName === 'forgot') forgotForm.classList.remove('hidden');
  }

  loginBtn.addEventListener('click', function () {
    clearMessages();
    if (localStorage.getItem('currentUser')) {
      displayMessage('✅ You are already logged in.', 'info');
    } else {
      authPopup.classList.remove('hidden');
      showForm('login');
    }
  });

  closePopup.addEventListener('click', function () {
    authPopup.classList.add('hidden');
  });

  toSignup.addEventListener('click', () => showForm('signup'));
  toForgot.addEventListener('click', () => showForm('forgot'));
  backToLogin1.addEventListener('click', () => showForm('login'));
  backToLogin2.addEventListener('click', () => showForm('login'));

  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    clearMessages();
    const user = {
      name: document.getElementById('signup-name').value,
      age: document.getElementById('signup-age').value,
      email: document.getElementById('signup-email').value,
      password: document.getElementById('signup-password').value,
    };

    localStorage.setItem(`user-${user.email}`, JSON.stringify(user));
    displayMessage('✅ Account created successfully! Please log in.', 'success');
    showForm('login');
  });

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    clearMessages();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const storedUser = JSON.parse(localStorage.getItem(`user-${email}`));
    if (storedUser && storedUser.password === password) {
      localStorage.setItem('currentUser', JSON.stringify(storedUser));
      authPopup.classList.add('hidden');
      updateUIAfterLogin(storedUser);
      showLoginSuccess(storedUser.name);
    } else {
      displayMessage('❌ Invalid email or password.', 'error');
    }
  });

  forgotForm.addEventListener('submit', function (e) {
    e.preventDefault();
    clearMessages();
    const email = document.getElementById('forgot-email').value;
    const storedUser = JSON.parse(localStorage.getItem(`user-${email}`));
    forgotMessage.classList.remove('hidden');

    if (storedUser) {
      forgotMessage.textContent = `🔒 Your password is: ${storedUser.password}`;
    } else {
      forgotMessage.textContent = '❌ No account found with that email.';
    }
  });

  logoutBtn.addEventListener('click', function () {
    clearMessages();
    localStorage.removeItem('currentUser');
    displayMessage('👋 You have been logged out.', 'info');
    loginBtn.classList.remove('hidden');
    logoutBtn.classList.add('hidden');
    helloName.classList.add('hidden');
  });

  function updateUIAfterLogin(user) {
    loginBtn.classList.add('hidden');
    logoutBtn.classList.remove('hidden');
    helloName.textContent = `👋 Hello, ${user.name}`;
    helloName.classList.remove('hidden');
  }

  function showLoginSuccess(name) {
    loginSuccessMessage.textContent = `✅ Successfully logged in as ${name}`;
    loginSuccessMessage.classList.remove('hidden');
  }

  function displayMessage(message, type) {
    messageArea.textContent = message;
    messageArea.className = '';
    if (type === 'success') messageArea.classList.add('text-green-600', 'font-bold', 'p-2');
    if (type === 'error') messageArea.classList.add('text-red-600', 'font-bold', 'p-2');
    if (type === 'info') messageArea.classList.add('text-blue-600', 'font-bold', 'p-2');
    messageArea.classList.remove('hidden');
  }

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    updateUIAfterLogin(currentUser);
  }
});
function openMemoryGame() {
  window.location.href = 'memory-game.html';
}

// Listen to storage changes from other tabs/pages
window.addEventListener('storage', function (e) {
  if (e.key === 'points') {
    // If points updated, re-read them and update display
    points = parseInt(e.newValue) || 0;
    updateLevels();
    updateStars();
    updatePointsDisplay();
  }
});
// Full Reset: Reset Level, Mini Score, and Main Points instantly
function fullResetGame() {
  localStorage.setItem('points', 0); 
  localStorage.setItem('memoryGamePoints', 0); 
  localStorage.setItem('memoryGameLevel', 1); 

  points = 0;
  level = 1;
  matchedPairs = 0;

  updateLevels();
  updateStars();
  updatePointsDisplay(); // Correct way to update Points UI with animation!

  document.getElementById('current-level').textContent = "1";   
  document.getElementById('current-score').textContent = "0";   

  gameBoard.innerHTML = ""; 
  startGame();
}


// When the page is loaded, connect the button
document.addEventListener('DOMContentLoaded', function () {
  const resetFullBtn = document.getElementById('reset-full-btn');
  if (resetFullBtn) {
    resetFullBtn.addEventListener('click', fullResetGame);
  }
});
