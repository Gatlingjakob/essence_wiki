// factions.js

document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const isInPages = currentPath.includes('/pages/');
  const factionsJsonPath = isInPages ? '../data/factions.json' : 'data/factions.json';
  const navbarPath = isInPages ? '../pages/navbar.html' : 'navbar.html';

  fetch(navbarPath)
    .then(res => res.text())
    .then(html => {
      document.getElementById('navbar').innerHTML = html;
    })
    .catch(err => {
      console.error('Failed to load navbar:', err);
    });
    
  fetch(factionsJsonPath)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('faction-list');

      // data is an object keyed by slug
      Object.entries(data)
        .filter(([slug, item]) => item.type === 'faction')
        .forEach(([slug, fact]) => {
          const p = document.createElement('p');
          p.innerHTML = `<a href="faction.html?slug=${slug}">${fact.name}</a>`;
          list.appendChild(p);
        });
    })
    .catch(err => {
      console.error('Failed to load factions.json', err);
    });
});
