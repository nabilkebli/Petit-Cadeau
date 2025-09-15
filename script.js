const bons = [
  { text: "🎁 Bon pour un câlin infini 🫂", quote: "L'amour est la poésie des sens. — Honoré de Balzac", used: false },
  { text: "🍫 Bon pour une soirée chocolat et film 🎬", quote: "Aimer, c’est trouver sa richesse hors de soi. — Alain", used: false },
  { text: "☕ Bon pour un café/thé préparé avec amour", quote: "Aimer, c’est savoir dire je t’aime sans parler. — Victor Hugo", used: false },
  { text: "🌙 Bon pour une soirée détente sous les étoiles ✨", quote: "Chaque étoile est un baiser envoyé du ciel. — Anonyme", used: false }
];

let pageIndex = 0;

// Charger depuis localStorage
if (localStorage.getItem("bons")) {
  const saved = JSON.parse(localStorage.getItem("bons"));
  bons.forEach((b, i) => bons[i].used = saved[i].used);
}

function renderBook() {
  const left = document.getElementById("page-left");
  const right = document.getElementById("page-right");

  if (pageIndex === 0) {
    left.innerHTML = "<h2>✨ Mon Carnet Magique ✨</h2><p>Pour Shanaa 💖</p>";
    right.innerHTML = "<p>Appuie sur➡️ pour découvrir tes bons 🎁</p>";
  } else {
    const bon = bons[pageIndex - 1];
    left.innerHTML = `<p class="quote">${bon.quote}</p>`;
    right.innerHTML = bon.used 
      ? `<p class="used">❌ ${bon.text}</p>` 
      : `<p>${bon.text}</p><br><button onclick="useBon(${pageIndex - 1})">Utiliser ce bon</button>`;
  }
}

function prevPage() {
  if (pageIndex > 0) { pageIndex--; renderBook(); }
}

function nextPage() {
  if (pageIndex < bons.length) { pageIndex++; renderBook(); }
}

function useBon(i) {
  bons[i].used = true;
  localStorage.setItem("bons", JSON.stringify(bons));
  renderBook();
}

function resetCarnet() {
  bons.forEach(b => b.used = false);
  localStorage.removeItem("bons");
  pageIndex = 0;
  renderBook();
}

renderBook();


