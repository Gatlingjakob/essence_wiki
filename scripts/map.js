// characters.js

document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const isInPages = currentPath.includes('/pages/');
  const charactersJsonPath = isInPages ? '../data/characters.json' : 'data/characters.json';
  const navbarPath = isInPages ? '../pages/navbar.html' : 'navbar.html';

  fetch(navbarPath)
    .then(res => res.text())
    .then(html => {
      document.getElementById('navbar').innerHTML = html;
    })
    .catch(err => {
      console.error('Failed to load navbar:', err);
    });
});
