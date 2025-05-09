// app.js

// Function to load the Memory Game (opens new page)
function loadMemoryGame() {
    window.location.href = 'memory-game.html';
  }
  /*
  function loadMemoryGame() {
    window.location.href = 'emote.html';
  }*/
  // Function to load the Home page
  function loadHome() {
    document.getElementById('mainContent').innerHTML = `
      <section class="home">
        <h1 class="text-2xl font-bold text-cyan-400 mb-4">Welcome to Learniverse!</h1>
        <p class="text-lg">Click on the menu to explore different sections of our interactive learning platform.</p>
      </section>
    `;
  }
  
  // Function to load the About page
  function loadAbout() {
    document.getElementById('mainContent').innerHTML = `
      <section class="about">
        <h1 class="text-2xl font-bold text-cyan-400 mb-4">About Learniverse</h1>
        <p class="text-lg">This project showcases engaging tools and data visualizations aimed at enhancing education.</p>
      </section>
    `;
  }
  
  // Function to load the Contact page
  function loadContact() {
    document.getElementById('mainContent').innerHTML = `
      <section class="contact">
        <h1 class="text-2xl font-bold text-cyan-400 mb-4">Contact Us</h1>
        <p class="text-lg">Email: example@example.com</p>
        <p class="text-lg">Phone: +91 9876543210</p>
      </section>
    `;
  }
  
  // DOMContentLoaded logic
  document.addEventListener('DOMContentLoaded', function () {
    const path = window.location.pathname;
  
    // Load Home only on index.html or root
    if (path.includes("index.html") || path === "/" || path.endsWith("/")) {
      loadHome();
    }
  
    // Add navigation listeners if elements exist
    document.getElementById('nav-home')?.addEventListener('click', loadHome);
    document.getElementById('nav-memory')?.addEventListener('click', loadMemoryGame);
    document.getElementById('nav-about')?.addEventListener('click', loadAbout);
    document.getElementById('nav-contact')?.addEventListener('click', loadContact);
  });
  
