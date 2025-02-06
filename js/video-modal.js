document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('videoModal');
    const modalIframe = modal.querySelector('iframe');
    const closeBtn = modal.querySelector('.close-modal');
    const returnBtn = modal.querySelector('.return-button');
    
    // Ouvrir le modal
    document.querySelectorAll('.video-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const videoId = this.dataset.videoId;
            modalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Empêche le scroll
        });
    });
    
    // Fermer le modal
    function closeModal() {
        modal.style.display = 'none';
        modalIframe.src = ''; // Arrête la vidéo
        document.body.style.overflow = ''; // Réactive le scroll
    }
    
    // Ajouter l'événement au bouton de retour
    returnBtn.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    // Fermer avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});
