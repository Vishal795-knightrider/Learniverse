$(document).ready(function () {
  let playing = false;
  let score = 0;
  let bestScore = parseInt(localStorage.getItem("bestScore")) || 0;
  let level = 1;
  let questionsAnswered = 0;
  let correctAnswer;
  const emojis = ["😃", "🚀", "🎉", "🌟", "😎"];
  const operations = ['+', '-', '×', '÷'];

  $("#bestScore").text(bestScore);

  function updateUI() {
    $("#scorevalue").text(score);
    $("#level").text(level);
    $("#progressBar").css("width", (questionsAnswered * 10) + "%");
  }

  function generateQA() {
    $("#nextlevel").hide();
    $("#feedbackEmoji").text('');

    let op = operations[Math.floor(Math.random() * operations.length)];
    let x = Math.floor(Math.random() * 10 * level) + 1;
    let y = Math.floor(Math.random() * 10 * level) + 1;

    if (op === '÷') {
      correctAnswer = x;
      y = y === 0 ? 1 : y;
      x = x * y;
    } else if (op === '-') {
      if (y > x) [x, y] = [y, x];
      correctAnswer = x - y;
    } else if (op === '+') {
      correctAnswer = x + y;
    } else {
      correctAnswer = x * y;
    }

    $("#question").text(`${x} ${op} ${y}`);

    let correctPos = Math.floor(Math.random() * 4) + 1;
    $(`#box${correctPos}`).text(correctAnswer);

    let answers = [correctAnswer];
    for (let i = 1; i <= 4; i++) {
      if (i !== correctPos) {
        let wrong;
        do {
          let a = Math.floor(Math.random() * 10 * level) + 1;
          let b = Math.floor(Math.random() * 10 * level) + 1;
          wrong = a + b;
        } while (answers.includes(wrong));
        $(`#box${i}`).text(wrong);
        answers.push(wrong);
      }
    }
  }

  function showLevelCompleted() {
    $("#congratsText").html(`🎉 Congratulations!<br>Level ${level - 1} Completed! 🎉`);
    $("#celebration").addClass("show");
    launchConfetti();
    setTimeout(() => {
      $("#celebration").removeClass("show");
      $("#nextlevel").fadeIn(500);
    }, 3000);
  }

  function launchConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
      }
      confetti(Object.assign({}, defaults, {
        particleCount: 5,
        origin: { x: randomInRange(0, 1), y: Math.random() * 0.2 }
      }));
    }, 250);
  }

  function updateLeaderboard(newScore) {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ score: newScore, time: Date.now() });
    leaderboard.sort((a, b) => b.score - a.score || a.time - b.time);

    // Limit to top 1 score
    leaderboard = leaderboard.slice(0, 1);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    renderLeaderboard();
  }

  function renderLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    // Filter out entries with score <= 0
    leaderboard = leaderboard.filter(entry => entry.score > 0);

    // Only render the top score if exists
    if (leaderboard.length > 0) {
      const topScore = leaderboard[0].score;
      $("#leaderboardList").html(`<li>#1: ${topScore} pts</li>`);
    }

    // Display best score
    if (bestScore > 0) {
      $("#bestScore").text(bestScore);
    }
  }

  $('.box').click(function () {
    if (!playing) return;
    let selected = parseInt($(this).text());
    if (selected === correctAnswer) {
      score++;
      questionsAnswered++;
      updateUI();
      $('#feedbackEmoji').text(emojis[Math.floor(Math.random() * emojis.length)]).css('transform', 'scale(1.5)').fadeIn(200).fadeOut(400);
      if (questionsAnswered === 10) {
        level++;
        score += 10;
        questionsAnswered = 0;

        // Update the best score if the current score is higher
        if (score > bestScore) {
          bestScore = score;
          localStorage.setItem("bestScore", bestScore); // Save the new best score
          $("#bestScore").text(bestScore); // Update best score on the UI
        }

        updateLeaderboard(score);
        showLevelCompleted();
      } else {
        generateQA();
      }
    } else {
      $('#question').addClass('shake');
      setTimeout(() => $('#question').removeClass('shake'), 500);
    }
  });

  $('#startreset').click(function () {
    if (playing) {
      // Before reloading or resetting, check if the current score is a new best score
      if (score > bestScore) {
        bestScore = score; // Update best score
        localStorage.setItem("bestScore", bestScore); // Store the new best score
        $("#bestScore").text(bestScore); // Update best score on the UI
      }
      
      location.reload(); // Reload the game
    } else {
      playing = true;
      score = 0;
      level = 1;
      questionsAnswered = 0;
      $("#startreset").text("Reset Game");
      $("#nextlevel").hide();
      updateUI();
      generateQA();
    }
  });

  $('#nextlevel').click(function () {
    $('#nextlevel').hide();
    $('#celebration').removeClass('show');
    generateQA();
  });

  // Reset best score functionality
  $('#resetBestScore').click(function () {
    bestScore = 0;
    localStorage.setItem("bestScore", bestScore);
    $("#bestScore").text(bestScore); // Update best score in the UI
  });

  renderLeaderboard();  // Call to render leaderboard initially
});
