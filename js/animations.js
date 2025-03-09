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

    // Scroll animations
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
    });

    // Animations au scroll
    const animatedElements = document.querySelectorAll('.service-card, .feature-card, .testimonial, .faq-item');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        scrollObserver.observe(el);
    });

    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-answer');
            
            // Ferme toutes les autres réponses
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    const otherAnswer = item.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0';
                    }
                }
            });
            
            // Toggle la réponse actuelle
            const isActive = faqItem.classList.toggle('active');
            
            if (isActive) {
                answer.style.maxHeight = `${answer.scrollHeight}px`;
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });
}); 