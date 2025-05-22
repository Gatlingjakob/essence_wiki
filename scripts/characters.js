// characters.js

document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const isInPages = currentPath.includes('/pages/');
  const charactersJsonPath = isInPages ? '../data/characters.json' : 'data/characters.json';

  fetch(charactersJsonPath)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('character-list');

      // data is an object keyed by slug
      Object.entries(data)
        .filter(([slug, item]) => item.type === 'character')
        .forEach(([slug, char]) => {
          const p = document.createElement('p');
          p.innerHTML = `<a href="character.html?slug=${slug}">${char.name}</a>`;
          list.appendChild(p);
        });
    })
    .catch(err => {
      console.error('Failed to load characters.json', err);
    });
});
