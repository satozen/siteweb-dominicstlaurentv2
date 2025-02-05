// Sticky header
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('floating');
    } else {
        header.classList.remove('floating');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

document.addEventListener('DOMContentLoaded', function() {
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
        });
    });

    // Testimonial slider
    const slider = document.querySelector('.testimonial-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3;
        slider.scrollLeft = scrollLeft - walk;
    });

    // Mobile menu toggle
    document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
        document.querySelector('.nav-links').classList.toggle('show');
    });

    document.querySelectorAll('.magic-text').forEach(el => {
        el.setAttribute('data-text', el.textContent);
    });

    // Entertainer text carousel
    const entertainerTexts = document.querySelectorAll('.entertainer-text');
    let currentIndex = 0;

    function changeEntertainerText() {
        entertainerTexts[currentIndex].classList.remove('active');
        entertainerTexts[currentIndex].classList.add('previous');
        
        currentIndex = (currentIndex + 1) % entertainerTexts.length;
        
        entertainerTexts[currentIndex].classList.remove('previous');
        entertainerTexts[currentIndex].classList.add('active');
    }

    // Set initial active text
    entertainerTexts[0].classList.add('active');

    // Change text every 1.5 seconds
    setInterval(changeEntertainerText, 1500);

    // Test immédiat pour voir si JavaScript fonctionne
    console.log('JavaScript is loaded!');

    // Gestionnaire FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const content = answer.querySelector('.faq-answer-content');
            
            // Ferme tous les autres FAQ items
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    const otherAnswer = item.querySelector('.faq-answer');
                    otherAnswer.style.height = '0';
                }
            });
            
            // Toggle l'état actif
            if (faqItem.classList.contains('active')) {
                faqItem.classList.remove('active');
                answer.style.height = '0';
            } else {
                faqItem.classList.add('active');
                answer.style.height = content.offsetHeight + 'px';
            }
        });
    });
});
