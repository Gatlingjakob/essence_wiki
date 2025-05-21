const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

document.addEventListener('DOMContentLoaded', () => {
  fetch('/pages/navbar.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('navbar').innerHTML = html;
    })
    .catch(err => {
      console.error('Failed to load navbar:', err);
    });
});

fetch("../data/characters.json")
  .then(res => res.json())
  .then(data => {
    const char = data[slug];
    if (!char) return;

    document.getElementById("char-name-header").textContent = char.name;
    document.getElementById("char-name").textContent = char.name;
    document.getElementById("char-img").src = char.image;

    const infoBox = document.getElementById("char-info");
    for (const [key, val] of Object.entries(char.info)) {
      const p = document.createElement("p");
      p.textContent = `${key}: ${val}`;
      infoBox.appendChild(p);
    }

    return fetch('../' + char.htmlFile);
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

  // Clear existing content
  toc.innerHTML = "";

  let h2Count = 0;
  let h3Count = 0;

  headings.forEach(h => {
    if (!h.id) h.id = h.textContent.toLowerCase().replace(/\s+/g, '-');

    if (h.tagName.toLowerCase() === 'h2') {
      h2Count++;
      h3Count = 0;

      const div = document.createElement("div");
      div.style.marginLeft = "0"; // no indent for h2
      const a = document.createElement("a");
      a.href = `#${h.id}`;
      a.textContent = `${h2Count}. ${h.textContent}`;
      div.appendChild(a);
      toc.appendChild(div);

    } else if (h.tagName.toLowerCase() === 'h3') {
      h3Count++;
      const div = document.createElement("div");
      div.style.marginLeft = "20px"; // indent for h3
      const a = document.createElement("a");
      a.href = `#${h.id}`;
      a.textContent = `${h2Count}.${h3Count} ${h.textContent}`;
      div.appendChild(a);
      toc.appendChild(div);
    }
  });
}

