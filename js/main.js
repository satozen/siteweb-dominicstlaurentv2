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
const mobileMenu = document.querySelector('.mobile-menu');
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// FAQ toggle
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            faqItem.classList.toggle('active');
        });
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
    question.parentElement.classList.toggle('active');
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
