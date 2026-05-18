
const grid = document.getElementById('grid');
const playerContainer = document.getElementById('player-container');
const univPlayer = document.getElementById('univ-player');
const closeBtn = document.getElementById('close-btn');

// variables (playlist temporelle)
let sequenceTimer = null;
let currentIndex = 0;

// 1. Génération de l'interface (videoData vient de data/videos.js)
videoData.forEach((data, index) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${data.url_miniature}" alt="Miniature">
    <h3>${data.titre_question}</h3>
  `;

  // 2. Action au clic sur une carte
  card.addEventListener('click', () => {
    lancerSequence(index); // On lance la lecture à partir de la vidéo cliquée
  });

  // Ajout de la carte dans la grille HTML
  grid.appendChild(card);
});


// 3. Fonction intelligente pour gérer l'enchaînement avec les iframes
function lancerSequence(index) {
  currentIndex = index;
  const data = videoData[currentIndex];
  
  // Charge la vidéo (le paramètre ?autoplay=1 dans ton URL s'occupe de la lancer)
  univPlayer.src = data.url_video; 
  playerContainer.style.display = 'flex'; // Affiche la modale
  
  // On annule le minuteur précédent au cas où l'utilisateur clique frénétiquement
  clearTimeout(sequenceTimer);
  
  // On calcule le temps en millisecondes (avec une sécurité de 60s par défaut si oubli)
  const dureeEnMillisecondes = (data.duree_seconde || 5) * 1000;
  
  // On programme le passage à la vidéo suivante
  sequenceTimer = setTimeout(() => {
    let nextIndex = currentIndex + 1;
    
    if (nextIndex < videoData.length) {
      // S'il reste des vidéos dans le tableau, on relance la fonction pour la suivante
      lancerSequence(nextIndex);
    } else {
      // Sinon, c'était la dernière vidéo : on ferme le lecteur
      closePlayer();
    }
  }, dureeEnMillisecondes);
}

// 3. Gestion de la fermeture du lecteur
function closePlayer() {
  playerContainer.style.display = 'none'; // Masque la modale
  univPlayer.src = ""; // Vide la source de l'iframe pour couper le son et la vidéo de l'université
  clearTimeout(sequenceTimer); // On arrête le chronomètre
}
// 4. Écouteurs d'événements pour la fermeture
closeBtn.addEventListener('click', closePlayer);
univPlayer.addEventListener('ended', closePlayer); // Ferme automatiquement à la fin de la vidéo