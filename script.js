const bons = [
  { text: "🎤 Bon pour un message audio surprise. Au cas où ma voix de puant te manque! ", quote: "L'amour est la poésie des sens. — Honoré de Balzac", used: false, photo: "photo1.gif" },
  { text: "📖 Bon pour une lecture à voix haute. Un poème par exemple ou ce que tu veux whatever je suis ta chose :) ", quote: "Chaque jour je t’aime davantage, aujourd’hui plus qu’hier et bien moins que demain. — Rosemonde Gérard", used: false, photo: "photo8.jpg" },
  { text: "☕ Bon pour un café/thé ensemble en visio.", quote: "Le bonheur le plus doux est celui qu’on partage. — Jacques Delille", used: false, photo: "photo3.gif" },
  { text: "💌 Bon pour une lettre d’amour. Je ne te l'enverrai pas par la Poste ne t'en fais pas ;) ", quote: "Aimer, ce n’est pas se regarder l’un l’autre, c’est regarder ensemble dans la même direction. — Antoine de Saint-Exupéry", used: false, photo: "photo4.jpg" },
  { text: "🎬 Bon pour une soirée WatchParty. Arcane Saison 2 OMG ?? ", quote: "Les souvenirs se construisent à deux, même à distance. — Anonyme", used: false, photo: "photo5.jpg" },
  { text: "📝 Bon pour un poème. C'est le retour du disquetteur fou !! ", quote: "Un seul être vous manque et tout est dépeuplé. — Lamartine", used: false, photo: "photo6.jpg" },
  { text: "🌅 Bon pour une semaine de réveils en douceur. Pour une semaine plus compliqués que les autres", quote: "Chaque matin est une promesse de bonheur. — Victor Hugo", used: false, photo: "photo7.jpg" },
  { text: "🎨 Bon pour une création artistique. Tu es mon inspiration <3 ", quote: "L’art est la rencontre inattendue de formes et de sentiments. — André Breton", used: false, photo: "photo2.gif" },
  { text: "📸 Bon pour des photos/vidéos droles de moi à l'époque avec le contexte.", quote: "Le souvenir est une rose au doux parfum qui jamais ne meurt. — George Sand", used: false, photo: "photo9.jpg" },
  { text: "🎮 Bon pour une activité interactive à distance (jeux vidéo, ou autre).", quote: "Jouer ensemble, c’est encore une façon de s’aimer. — Anonyme", used: false, photo: "photo10.png" }
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
    left.innerHTML = "<h2>📖 Carnet De Bons</h2><p>Pour Shanaa 💖</p>";
    right.innerHTML = "<p>Tourne la page➡️ pour découvrir tes bons 🎁 </p> <p> Merci pour ces 3 mois </p>";
    useBtn.style.display = "none";
  } else {
    const bon = bons[pageIndex - 1];
    left.innerHTML = `<p class="quote">${bon.quote}</p>`;
    right.innerHTML = bon.used 
      ? `<s>${bon.text}</s><br><small>(déjà utilisé ✂️)</small>` 
      : `<p>${bon.text}</p><img src="${bon.photo}" alt="photo">`;
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

