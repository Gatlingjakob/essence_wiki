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

  fetch(charactersJsonPath)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('character-list');

      // Filter and sort characters by name
      const characters = Object.entries(data)
        .filter(([_, item]) => item.type === 'character')
        .sort(([, a], [, b]) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

      let currentLetter = '';

      characters.forEach(([slug, char]) => {
        const firstLetter = char.name[0].toUpperCase();

        // Add letter header if new section
        if (firstLetter !== currentLetter) {
          currentLetter = firstLetter;
          const letterHeader = document.createElement('h2');
          letterHeader.textContent = currentLetter;
          list.appendChild(letterHeader);
        }

        // Create container for image + name
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.marginBottom = '8px';

        const img = document.createElement('img');
        img.src = char.image;
        img.alt = `${char.name} portrait`;
        img.style.width = '40px';
        img.style.height = '40px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '4px';
        img.style.marginRight = '10px';

        const link = document.createElement('a');
        link.href = `character.html?slug=${slug}`;
        link.textContent = char.name;

        container.appendChild(img);
        container.appendChild(link);
        list.appendChild(container);
      });
    })

    .catch(err => {
      console.error('Failed to load characters.json', err);
    });
});
