// characters.js

fetch('data/characters.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('character-list');

    // data is an object keyed by slug
    Object.entries(data)
      .filter(([slug, item]) => item.type === 'character')
      .forEach(([slug, char]) => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="character.html?slug=${slug}">${char.name}</a>`;
        list.appendChild(li);
      });
  })
  .catch(err => {
    console.error('Failed to load characters.json', err);
  });
