const bons = [
  { text: "🎤 Bon pour un message audio surprise (souvenir ou pensée pour toi).", quote: "L'amour est la poésie des sens. — Honoré de Balzac", used: false },
  { text: "📖 Bon pour une lecture à voix haute (poème ou extrait choisi).", quote: "Chaque jour je t’aime davantage, aujourd’hui plus qu’hier et bien moins que demain. — Rosemonde Gérard", used: false },
  { text: "☕ Bon pour un café/thé ensemble en visio.", quote: "Le bonheur le plus doux est celui qu’on partage. — Jacques Delille", used: false },
  { text: "💌 Bon pour une lettre d’amour envoyée en message.", quote: "Aimer, ce n’est pas se regarder l’un l’autre, c’est regarder ensemble dans la même direction. — Antoine de Saint-Exupéry", used: false },
  { text: "🎬 Bon pour une soirée film/série à distance en synchro.", quote: "Les souvenirs se construisent à deux, même à distance. — Anonyme", used: false },
  { text: "📝 Bon pour un poème ou un petit texte romantique écrit spécialement pour toi.", quote: "Un seul être vous manque et tout est dépeuplé. — Lamartine", used: false },
  { text: "🌅 Bon pour une semaine de réveils en douceur (un message du matin pendant 7 jours).", quote: "Chaque matin est une promesse de bonheur. — Victor Hugo", used: false },
  { text: "🎨 Bon pour une création artistique (dessin, collage ou petit montage personnalisé).", quote: "L’art est la rencontre inattendue de formes et de sentiments. — André Breton", used: false },
  { text: "📸 Bon pour une mini-chasse aux souvenirs (photo + anecdote spéciale).", quote: "Le souvenir est une rose au doux parfum qui jamais ne meurt. — George Sand", used: false },
  { text: "🎮 Bon pour une activité interactive à distance (mini-jeu, quiz ou escape game que je crée pour toi).", quote: "Le jeu est la forme la plus élevée de la recherche. — Albert Einstein", used: false }
];

let pageIndex = 0;
const useBtn = document.getElementById("useBonBtn");
const pageSound = document.getElementById("pageSound");
const tearSound = document.getElementById("tearSound");

if (localStorage.getItem("bons")) {
  const saved = JSON.parse(localStorage.getItem("bons"));
  bons.forEach((b, i) => bons[i].used = saved[i].used);
}

function renderBook() {
  const left = document.getElementById("page-left");
  const right = document.getElementById("page-right");

  if (pageIndex === 0) {
    left.innerHTML = "<h2>📖 Carnet Magique</h2><p>Pour Shanaa 💖</p>";
    right.innerHTML = "<p>Tourne la page ➡️ pour découvrir tes bons 🎁</p>";
    useBtn.style.display = "none";
  } else {
    const bon = bons[pageIndex - 1];
    left.innerHTML = `<p class="quote">${bon.quote}</p>`;
    right.innerHTML = bon.used 
      ? `<s>${bon.text}</s><br><small>(déjà utilisé ✂️)</small>` 
      : bon.text;
    useBtn.style.display = bon.used ? "none" : "flex";
    useBtn.onclick = () => useBon(pageIndex - 1);
  }
}

function prevPage() {
  if (pageIndex > 0) { pageIndex--; renderBook(); pageSound.play(); }
}

function nextPage() {
  if (pageIndex < bons.length) { pageIndex++; renderBook(); pageSound.play(); }
}

function useBon(i) {
  bons[i].used = true;
  localStorage.setItem("bons", JSON.stringify(bons));
  tearSound.play();
  renderBook();
}

function resetCarnet() {
  bons.forEach(b => b.used = false);
  localStorage.removeItem("bons");
  pageIndex = 0;
  renderBook();
}

renderBook();





