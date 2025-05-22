document.addEventListener('DOMContentLoaded', () => {
  // Load navbar for root page
  fetch('navbar-index.html')  // navbar.html in root folder
    .then(res => res.text())
    .then(html => {
      document.getElementById('navbar-index').innerHTML = html;
    })
    .catch(err => {
      console.error('Failed to load navbar:', err);
    });
});