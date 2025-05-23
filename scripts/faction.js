const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const isInPages = currentPath.includes('/pages/');
  const navbarPath = isInPages ? '../pages/navbar.html' : 'navbar.html';
  const factionsJsonPath = isInPages ? '../data/factions.json' : 'data/factions.json';

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
      const fact = data[slug];
      if (!fact) return;

      document.getElementById("fact-name-header").textContent = fact.name;
      // document.getElementById("fact-quote").textContent = "\"" + fact.quote +  "\"";
      // document.getElementById("fact-quote-name").textContent = "- " + fact.name;
      document.getElementById("fact-name").textContent = fact.name;
      document.getElementById("fact-img").src = fact.image;

      const infoBox = document.getElementById("fact-info");
      for (const [key, val] of Object.entries(fact.info)) {
        const p = document.createElement("p");
        p.textContent = `${key}: ${val}`;
        infoBox.appendChild(p);
      }

      const articleHtmlPath = isInPages ? `../${fact.htmlFile}` : fact.htmlFile;
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
      console.error('Failed to load faction content:', err);
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
