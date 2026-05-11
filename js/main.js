// Ciblage des éléments du DOM
const grid = document.getElementById('grid');
const playerContainer = document.getElementById('player-container');
const videoPlayer = document.getElementById('video-player');
const closeBtn = document.getElementById('close-btn');

// 1. Génération de l'interface (videoData vient de data/videos.js)
videoData.forEach(data => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${data.url_miniature}" alt="Miniature">
    <h3>${data.titre_question}</h3>
  `;
  
  // 2. Action au clic sur une carte
  card.addEventListener('click', () => {
    videoPlayer.src = data.url_video;       // Charge la bonne vidéo
    playerContainer.style.display = 'flex'; // Affiche la modale
    videoPlayer.play();                     // Lance la lecture
  });

  // Ajout de la carte dans la grille HTML
  grid.appendChild(card);
});

// 3. Gestion de la fermeture du lecteur
function closePlayer() {
  playerContainer.style.display = 'none'; // Masque la modale
  videoPlayer.pause();                    // Coupe le son/l'image
  videoPlayer.currentTime = 0;            // Remet la vidéo au début
}

// 4. Écouteurs d'événements pour la fermeture
closeBtn.addEventListener('click', closePlayer);
videoPlayer.addEventListener('ended', closePlayer); // Ferme automatiquement à la fin de la vidéo