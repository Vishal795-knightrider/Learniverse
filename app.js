// app.js

// Function to load the Memory Game (opens new page)
function loadMemoryGame() {
    window.location.href = 'memory-game.html'; // <-- changed here!
}

// Function to load the Home page
function loadHome() {
    document.getElementById('mainContent').innerHTML = `
        <section class="home">
            <h1>Welcome to My Project!</h1>
            <p>Click on the menu to explore different sections.</p>
        </section>
    `;
}

// Function to load the About page
function loadAbout() {
    document.getElementById('mainContent').innerHTML = `
        <section class="about">
            <h1>About Us</h1>
            <p>This project is designed to impress judges with interactive features!</p>
        </section>
    `;
}

// Function to load the Contact page
function loadContact() {
    document.getElementById('mainContent').innerHTML = `
        <section class="contact">
            <h1>Contact Us</h1>
            <p>Email: example@example.com</p>
            <p>Phone: +91 9876543210</p>
        </section>
    `;
}

// Add event listeners for navigation links
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('nav-home').addEventListener('click', loadHome);
    document.getElementById('nav-memory').addEventListener('click', loadMemoryGame);
    document.getElementById('nav-about').addEventListener('click', loadAbout);
    document.getElementById('nav-contact').addEventListener('click', loadContact);

    // Load Home page by default
    loadHome();
});
