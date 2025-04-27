
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

// ========== Update Points Display ==========
function updatePointsDisplay() {
  const pointsDisplay = document.getElementById('points-display');
  
  if (pointsDisplay) {
    const newPointsStr = points.toString().padStart(3, '0');
    const oldPointsStr = pointsDisplay.getAttribute('data-points') || '000';

    let digitsHTML = '<div class="digits-wrapper" style="display: inline-flex; align-items: center; gap: 2px;">';

    for (let i = 0; i < newPointsStr.length; i++) {
      const oldDigit = oldPointsStr[i];
      const newDigit = newPointsStr[i];

      digitsHTML += `
        <div class="digit-container" style="height: 2rem; width: 1.5rem; overflow: hidden; position: relative;">
          <div class="digit old" style="position: absolute; top: 0; left: 0; width: 100%; transition: transform 0.5s ease;">${oldDigit}</div>
          <div class="digit new" style="position: absolute; top: 100%; left: 0; width: 100%; transition: transform 0.5s ease;">${newDigit}</div>
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

// ========== Update Levels ==========
function updateLevels() {
  if (points >= 0) levels[0].classList.add('unlocked');
  if (points >= 100) levels[1].classList.add('unlocked');
  if (points >= 200) levels[2].classList.add('unlocked');
  if (points >= 300) levels[3].classList.add('unlocked');
  if (points >= 400) levels[4].classList.add('unlocked');

  if (points < 100) {
    levelStatus.textContent = "Earn 100 points to unlock Level 2!";
  } else if (points < 200) {
    levelStatus.textContent = "Earn 100 points to unlock Level 3!";
  } else if (points < 300) {
    levelStatus.textContent = "Earn 100 points to unlock Level 4!";
  } else if (points < 400) {
    levelStatus.textContent = "Earn 100 points to unlock Level 5!";
  } else {
    levelStatus.textContent = "Congratulations! All Levels Unlocked!";
  }
}

// ========== Update Stars ==========
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

// ========== Earn Points ==========
function earnPoints(earnedPoints) {
  points += earnedPoints;
  localStorage.setItem('points', points);

  updateLevels();
  updateStars();
  updatePointsDisplay();
}

// ========== Reset Points ==========
function resetPoints() {
  points = 0;
  localStorage.setItem('points', points);

  updateLevels();
  updateStars();
  updatePointsDisplay();
}

// ========== Initialize ==========
window.addEventListener('DOMContentLoaded', () => {
  const savedPoints = localStorage.getItem('points');

  if (savedPoints) {
    points = parseInt(savedPoints);
  } else {
    points = 0;
  }

  updateLevels();
  updateStars();
  updatePointsDisplay();
});

// Example for Testing
earnPoints(313);

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
      case 'happy':
        message = "Keep smiling and shining! 🌟";
        break;
      case 'sad':
        message = "It's okay to feel sad. Tomorrow will be brighter. ❤️";
        break;
      case 'excited':
        message = "Yay! Let’s have an awesome learning adventure! 🚀";
        break;
      case 'angry':
        message = "Take a deep breath, you’re doing great! 😌";
        break;
      case 'calm':
        message = "Peaceful minds are powerful minds. ✨";
        break;
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

  function showForm(formName) {
    loginForm.classList.add('hidden');
    signupForm.classList.add('hidden');
    forgotForm.classList.add('hidden');

    if (formName === 'login') loginForm.classList.remove('hidden');
    if (formName === 'signup') signupForm.classList.remove('hidden');
    if (formName === 'forgot') forgotForm.classList.remove('hidden');
  }

  // Show login popup
  loginBtn.addEventListener('click', function () {
    if (localStorage.getItem('currentUser')) {
      alert('✅ You are already logged in!');
    } else {
      authPopup.classList.remove('hidden');
      showForm('login');
    }
  });

  // Close popup
  closePopup.addEventListener('click', function () {
    authPopup.classList.add('hidden');
  });

  // Switch forms
  toSignup.addEventListener('click', () => showForm('signup'));
  toForgot.addEventListener('click', () => showForm('forgot'));
  backToLogin1.addEventListener('click', () => showForm('login'));
  backToLogin2.addEventListener('click', () => showForm('login'));

  // Handle signup
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const user = {
      name: document.getElementById('signup-name').value,
      age: document.getElementById('signup-age').value,
      email: document.getElementById('signup-email').value,
      password: document.getElementById('signup-password').value,
    };

    localStorage.setItem(`user-${user.email}`, JSON.stringify(user));
    alert('✅ Account created successfully!');
    showForm('login');
  });

  // Handle login
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const storedUser = JSON.parse(localStorage.getItem(`user-${email}`));

    if (storedUser && storedUser.password === password) {
      localStorage.setItem('currentUser', JSON.stringify(storedUser));
      alert('✅ Login successful!');
      authPopup.classList.add('hidden');
      updateUIAfterLogin(storedUser);
    } else {
      alert('❌ Invalid email or password.');
    }
  });

  // Handle forgot password
  forgotForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value;
    const storedUser = JSON.parse(localStorage.getItem(`user-${email}`));

    if (storedUser) {
      const templateParams = {
        to_email: email,
        reset_link: `https://yourwebsite.com/reset-password.html?email=${encodeURIComponent(email)}`
      };

      emailjs.send('service_a4y82kl', 'template_eb7x86s', templateParams)
        .then(function(response) {
          alert('✅ Password reset link has been sent to your email!');
          showForm('login');
        }, function(error) {
          console.error('FAILED...', error);
          alert('❌ Failed to send reset email. Please try again.');
        });
    } else {
      alert('❌ No account found with that email.');
    }
  });

  // Handle logout
  logoutBtn.addEventListener('click', function () {
    localStorage.removeItem('currentUser');
    alert('👋 You have been logged out.');

    loginBtn.classList.remove('hidden');
    logoutBtn.classList.add('hidden');
    helloName.classList.add('hidden');
  });

  // Update UI if already logged in
  function updateUIAfterLogin(user) {
    loginBtn.classList.add('hidden');
    logoutBtn.classList.remove('hidden');
    helloName.textContent = `👋 Hello, ${user.name}`;
    helloName.classList.remove('hidden');
  }

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    updateUIAfterLogin(currentUser);
  }
});

