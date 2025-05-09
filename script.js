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

  if (points < 100) levelStatus.textContent = "Earn 100 points to unlock Level 1!";
  else if (points < 200) levelStatus.textContent = "Earn 100 points to unlock Level 2!";
  else if (points < 300) levelStatus.textContent = "Earn 100 points to unlock Level 3!";
  else if (points < 400) levelStatus.textContent = "Earn 100 points to unlock Level 4!";
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
  // Reset points and levels
  points = 0;
  localStorage.setItem('points', points);
  
  // Remove all unlocked levels
  levels.forEach(level => level.classList.remove('unlocked'));
  
  // Reset level status message
  levelStatus.textContent = "Earn 100 points to unlock Level 1!";

  // Reset stars
  updateStars();
  
  // Reset points display with animation
  updatePointsDisplay();
  
  // Optionally, reset any other progress related to the user (e.g., achievements, etc.)
  localStorage.removeItem('user-progress'); // Example key for user progress reset

  // Alert user that progress has been reset
  alert("Your progress has been reset.");
}

window.addEventListener('DOMContentLoaded', () => {
  const savedPoints = localStorage.getItem('points');
  points = savedPoints ? parseInt(savedPoints) : 0;
  updateLevels();
  updateStars();
  updatePointsDisplay();
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

  const messageArea = document.getElementById('global-message');

  function clearMessages() {
    messageArea.textContent = '';
    messageArea.classList.add('hidden');
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

  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    clearMessages();
    const user = {
      name: document.getElementById('signup-name').value,
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
    } else {
      displayMessage('❌ Invalid email or password.', 'error');
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
    helloName.classList.remove('hidden');
    helloName.textContent = `Hello, ${user.name}!`;

    // Switch to home page view
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('home-page').classList.remove('hidden');
  }

  function displayMessage(message, type) {
    messageArea.classList.remove('hidden');
    messageArea.classList.add(type);
    messageArea.textContent = message;
  }

  // On page load, check for an existing logged-in user
  if (localStorage.getItem('currentUser')) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    updateUIAfterLogin(currentUser);
  }
});
// script.js

document.addEventListener("DOMContentLoaded", function () {
  const resetBtn = document.getElementById("reset-full-btn");
  const pointsValue = document.getElementById("points-value");
  const levelStatus = document.getElementById("level-status");

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      // Confirm reset
      if (confirm("Are you sure you want to reset all progress?")) {
        // Clear localStorage or any saved values
        localStorage.clear();

        // Reset points display
        if (pointsValue) pointsValue.textContent = "000";

        // Reset levels or anything else
        const levels = document.querySelectorAll(".level");
        levels.forEach((level, index) => {
          if (index === 0) {
            level.classList.add("unlocked");
          } else {
            level.classList.remove("unlocked");
          }
        });

        // Reset level status
        if (levelStatus) {
          levelStatus.textContent = "Earn 100 points to unlock next Level!";
        }

        // Optionally reset user name or session
        document.getElementById("hello-name").textContent = "";
        alert("Progress has been reset!");
      }
    });
  }
});
