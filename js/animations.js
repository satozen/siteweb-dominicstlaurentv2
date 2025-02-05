// Configuration de l'Intersection Observer
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

// Créer l'observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target); // Arrête d'observer une fois animé
        }
    });
}, observerOptions);

// Fonction pour initialiser les animations
document.addEventListener('DOMContentLoaded', () => {
    // Hero animations
    const heroElements = document.querySelectorAll('.hero-title-block, .hero-headline, .hero-description, .cta-button');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 * index);
    });

    // Animations au scroll
    const animatedElements = document.querySelectorAll('.service-card, .feature-card, .testimonial, .faq-item');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}); 