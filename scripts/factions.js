document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const isInPages = currentPath.includes('/pages/');
  const factionsJsonPath = isInPages ? '../data/factions.json' : 'data/factions.json';
  const navbarPath = isInPages ? '../pages/navbar.html' : 'navbar.html';

  // Helper to sort by name without "The"
  function sortName(name) {
    return name.replace(/^the\s+/i, '');
  }

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

      const factions = Object.entries(data)
        .filter(([_, item]) => item.type === 'faction')
        .sort(([, a], [, b]) => 
          sortName(a.name).localeCompare(sortName(b.name), undefined, { sensitivity: 'base' })
        );

      let currentLetter = '';

      factions.forEach(([slug, fact]) => {
        const firstLetter = sortName(fact.name)[0].toUpperCase();

        if (firstLetter !== currentLetter) {
          currentLetter = firstLetter;
          const letterHeader = document.createElement('h2');
          letterHeader.textContent = currentLetter;
          list.appendChild(letterHeader);
        }

        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.marginBottom = '8px';

        const img = document.createElement('img');
        img.src = fact.image;
        img.alt = `${fact.name} portrait`;
        img.style.width = '40px';
        img.style.height = '40px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '4px';
        img.style.marginRight = '10px';

        const link = document.createElement('a');
        link.href = `faction.html?slug=${slug}`;
        link.textContent = fact.name;

        container.appendChild(img);
        container.appendChild(link);
        list.appendChild(container);
      });
    })
    .catch(err => {
      console.error('Failed to load factions.json', err);
    });
});
