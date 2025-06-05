const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const isInPages = currentPath.includes('/pages/');

  const navbarPath = isInPages ? '../pages/navbar.html' : 'navbar.html';
  const charactersJsonPath = isInPages ? '../data/characters.json' : 'data/characters.json';

  fetch(navbarPath)
    .then(res => res.text())
    .then(html => {
      document.getElementById('navbar').innerHTML = html;
    })
    .catch(err => console.error('Failed to load navbar:', err));

  fetch(charactersJsonPath)
    .then(res => res.json())
    .then(data => {
      const char = data[slug];
      if (!char) return;

      document.title = char.name;
      document.getElementById("char-name-header").textContent = char.name;
      document.getElementById("char-quote").textContent = "\"" + char.quote + "\"";
      document.getElementById("char-quote-name").textContent = "- " + char.name;
      document.getElementById("char-name").textContent = char.name;
      document.getElementById("char-img").src = char.image;

      const infoBox = document.getElementById("char-info");
      infoBox.innerHTML = "";
      const infoTable = document.createElement("div");
      infoTable.className = "article-info-table";

      for (const [key, val] of Object.entries(char.info)) {
        const row = document.createElement("div");
        row.className = "article-info-row";

        const keyCell = document.createElement("div");
        keyCell.className = "article-info-cell article-info-key";
        keyCell.textContent = prettifyKey(key);

        const valueCell = document.createElement("div");
        valueCell.className = "article-info-cell article-info-value";

        const values = Array.isArray(val) ? val : [val];
        values.forEach(v => {
          const line = document.createElement("div");

          const isSpoiler = typeof v === "string" && v.startsWith("Spoiler:");
          const displayText = isSpoiler ? v.replace("Spoiler: ", "") : v;
          const slugified = slugify(displayText);
          let link = null;

          // Determine link destination
          if (["relatives"].includes(key)) {
            link = `character.html?slug=${slugified}`;
          } else if (["allegiance"].includes(key)) {
            link = `faction.html?slug=${slugified}`;
          } else if (["birthplace"].includes(key)) {
            link = `location.html?slug=${slugified}`;
          }

          if (link) {
            const anchor = document.createElement("a");
            anchor.href = link;
            anchor.textContent = displayText;
            anchor.style.color = "#2b4f8c";
            anchor.style.textDecoration = "underline";

            if (isSpoiler) {
              line.appendChild(createSpoiler(anchor));
            } else {
              line.appendChild(anchor);
            }
          } else {
            if (isSpoiler) {
              line.appendChild(createSpoiler(displayText));
            } else {
              line.textContent = displayText;
            }
          }

          valueCell.appendChild(line);
        });

        row.appendChild(keyCell);
        row.appendChild(valueCell);
        infoTable.appendChild(row);
      }

      infoBox.appendChild(infoTable);

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
    .catch(err => console.error('Failed to load character content:', err));
});

// Utility: Capitalize and replace underscores
function prettifyKey(key) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// Utility: Slugify text for use in URLs
function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
}

function createSpoiler(content) {
  const wrapper = document.createElement("span");
  wrapper.className = "spoiler-wrapper";

  const placeholder = document.createElement("span");
  placeholder.className = "spoiler-box";
  placeholder.textContent = "Spoiler";

  const reveal = document.createElement("span");
  reveal.className = "spoiler-reveal";
  reveal.style.display = "none";

  if (typeof content === "string") {
    reveal.textContent = content;
  } else {
    reveal.appendChild(content);
  }

  placeholder.addEventListener("click", () => {
    placeholder.style.display = "none";
    reveal.style.display = "inline";
  });

  wrapper.appendChild(placeholder);
  wrapper.appendChild(reveal);
  return wrapper;
}

// Table of contents (unchanged)
function generateTOC(container) {
  const headings = container.querySelectorAll("h2, h3");
  const toc = document.getElementById("toc-list");
  toc.innerHTML = "";

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
