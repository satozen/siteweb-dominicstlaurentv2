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

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

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

// Rest of the JavaScript from the provided code goes here

document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    faqItem.classList.toggle('active');
  });
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

// Gestionnaire FAQ direct
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        const faqItem = question.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        
        // Initialisation
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease-out, padding 0.3s ease-out';
        
        question.addEventListener('click', function() {
            const isOpening = !faqItem.classList.contains('active');
            
            // Ferme toutes les autres réponses
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = '0';
                    item.querySelector('.faq-answer').style.padding = '0 1rem';
                }
            });
            
            // Bascule l'état actif
            faqItem.classList.toggle('active');
            
            if (isOpening) {
                answer.style.padding = '1rem';
                answer.style.maxHeight = answer.scrollHeight + 20 + 'px'; // Ajoute un peu d'espace supplémentaire
            } else {
                answer.style.maxHeight = '0';
                answer.style.padding = '0 1rem';
            }
        });
    });
});
