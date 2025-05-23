const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const isInPages = currentPath.includes('/pages/');

  // Load navbar:
  // If we're in /pages/, navbar is ../pages/navbar.html
  // If root, navbar is ./navbar.html
  const navbarPath = isInPages ? '../pages/navbar.html' : 'navbar.html';

  // Load characters.json with correct relative path:
  // In /pages/, ../data/characters.json
  // In root, data/characters.json
  const charactersJsonPath = isInPages ? '../data/characters.json' : 'data/characters.json';

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
      const char = data[slug];
      if (!char) return;

      document.getElementById("char-name-header").textContent = char.name;
      document.getElementById("char-quote").textContent = "\"" + char.quote +  "\"";
      document.getElementById("char-quote-name").textContent = "- " + char.name;
      document.getElementById("char-name").textContent = char.name;
      document.getElementById("char-img").src = char.image;

      const infoBox = document.getElementById("char-info");
      for (const [key, val] of Object.entries(char.info)) {
        const p = document.createElement("p");
        const valueText = Array.isArray(val) ? val.join(", ") : val;
        p.textContent = `${key}: ${valueText}`;
        infoBox.appendChild(p);
      }

      // Load character HTML content with correct path:
      // char.htmlFile might be 'pages/char.html' or just 'char.html'
      const articleHtmlPath = isInPages ? `../${char.htmlFile}` : char.htmlFile;
      return fetch(articleHtmlPath);
    })
    .then(res => res.text())
    .then(html => {
      const container = document.getElementById("article-container");
      if (container) {
        container.innerHTML = html;
        generateTOC(container);
      }
    })
    .catch(err => {
      console.error('Failed to load character content:', err);
    });
});

function generateTOC(container) {
  const headings = container.querySelectorAll("h2, h3");
  const toc = document.getElementById("toc-list");

  toc.innerHTML = ""; // Clear old content

  let h2Count = 0;
  let h3Count = 0;

  headings.forEach(h => {
    if (!h.id) h.id = h.textContent.toLowerCase().replace(/\s+/g, '-');

    const div = document.createElement("div");
    const a = document.createElement("a");
    a.href = `#${h.id}`;

    if (h.tagName.toLowerCase() === 'h2') {
      h2Count++;
      h3Count = 0;
      a.textContent = `${h2Count}. ${h.textContent}`;
      div.style.marginLeft = "0";
    } else if (h.tagName.toLowerCase() === 'h3') {
      h3Count++;
      a.textContent = `${h2Count}.${h3Count} ${h.textContent}`;
      div.style.marginLeft = "20px";
    }

    div.appendChild(a);
    toc.appendChild(div);
  });
}
