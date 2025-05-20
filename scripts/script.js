const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

document.addEventListener('DOMContentLoaded', () => {
  fetch('partials/navbar.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('navbar').innerHTML = html;
    })
    .catch(err => {
      console.error('Failed to load navbar:', err);
    });
});

fetch("data/characters.json")
  .then(res => res.json())
  .then(data => {
    const char = data[slug];
    if (!char) return;

    document.getElementById("char-name").textContent = char.name;
    document.getElementById("char-img").src = char.image;

    const infoBox = document.getElementById("char-info");
    for (const [key, val] of Object.entries(char.info)) {
      const li = document.createElement("li");
      li.textContent = `${key}: ${val}`;
      infoBox.appendChild(li);
    }

    return fetch(char.htmlFile);
  })
  .then(res => res.text())
  .then(html => {
    const container = document.getElementById("article-container");
    container.innerHTML = html;
    generateTOC(container);
  });

function generateTOC(container) {
  const headings = container.querySelectorAll("h2, h3");
  const toc = document.getElementById("toc-list");

  headings.forEach(h => {
    if (!h.id) h.id = h.textContent.toLowerCase().replace(/\s+/g, '-');
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${h.id}`;
    a.textContent = h.textContent;
    li.appendChild(a);
    toc.appendChild(li);
  });
}
