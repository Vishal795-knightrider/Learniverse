// Get email from URL
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email')?.toLowerCase(); // <-- Always use lowercase

const resetForm = document.getElementById('reset-form');
const message = document.getElementById('message');

resetForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const newPassword = document.getElementById('new-password').value;

  const storedUser = JSON.parse(localStorage.getItem(`user-${email}`));
  if (storedUser) {
    storedUser.password = newPassword;
    localStorage.setItem(`user-${email}`, JSON.stringify(storedUser));
    message.textContent = '✅ Password reset successfully! You can now login.';
    setTimeout(() => {
      window.location.href = 'index.html'; // redirect back to login
    }, 2000);
  } else {
    message.textContent = '❌ User not found.';
  }
});
