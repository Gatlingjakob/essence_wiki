document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const isInPages = currentPath.includes('/pages/');
  const creaturesJsonPath = isInPages ? '../data/creatures.json' : 'data/creatures.json';
  const navbarPath = isInPages ? '../pages/navbar.html' : 'navbar.html';

  fetch(navbarPath)
    .then(res => res.text())
    .then(html => {
      document.getElementById('navbar').innerHTML = html;
    })
    .catch(err => {
      console.error('Failed to load navbar:', err);
    });

  fetch(creaturesJsonPath)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('creature-list');

      // Filter and sort creatures by name
      const creatures = Object.entries(data)
        .filter(([_, item]) => item.type === 'creature')
        .sort(([, a], [, b]) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

      let currentLetter = '';

      creatures.forEach(([slug, crea]) => {
        const firstLetter = crea.name[0].toUpperCase();

        // Add letter header if new section
        if (firstLetter !== currentLetter) {
          currentLetter = firstLetter;
          const letterHeader = document.createElement('h2');
          letterHeader.textContent = currentLetter;
          list.appendChild(letterHeader);
          
          const hr = document.createElement('hr');
          hr.style.border = 'none';
          hr.style.borderTop = '1px solid #d6dbeb';
          list.appendChild(hr);
        }

        // Create container for image + name
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.marginBottom = '8px';

        const img = document.createElement('img');
        img.src = crea.image;
        img.alt = `${crea.name} portrait`;
        img.style.width = '40px';
        img.style.height = '40px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '4px';
        img.style.marginRight = '10px';
       // img.style.marginTop = '15px';
       // img.style.marginBottom = '15px';

        const link = document.createElement('a');
        link.href = `creature.html?slug=${slug}`;
        link.textContent = crea.name;

        container.appendChild(img);
        container.appendChild(link);
        list.appendChild(container);
      });
    })

    .catch(err => {
      console.error('Failed to load creatures.json', err);
    });
});
