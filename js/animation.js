document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.talent-card');
    
    if (!cards.length) return; // Sort si pas de cartes

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajouter un petit délai pour s'assurer que l'utilisateur a bien scrollé jusqu'à la section
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3, // L'élément doit être 30% visible avant de déclencher
        rootMargin: '-50px' // Déclenche l'animation 50px après que l'élément soit entré dans le viewport
    });

    cards.forEach(card => observer.observe(card));
});

// Ajouter une vérification immédiate au cas où les cartes sont déjà visibles
window.addEventListener('load', function() {
    const cards = document.querySelectorAll('.talent-card');
    if (cards.length > 0) {
        cards.forEach(card => {
            if (card.getBoundingClientRect().top < window.innerHeight) {
                card.classList.add('animate');
                console.log('Animation forcée sur carte visible');
            }
        });
    }
});
