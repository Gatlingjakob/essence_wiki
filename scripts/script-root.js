document.addEventListener('DOMContentLoaded', () => {
  // Load navbar for root page
  fetch('navbar.html')  // navbar.html in root folder
    .then(res => res.text())
    .then(html => {
      document.getElementById('navbar').innerHTML = html;
    })
    .catch(err => {
      console.error('Failed to load navbar:', err);
    });
});