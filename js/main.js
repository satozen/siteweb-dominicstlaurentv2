/**
 * Main JavaScript pour le site de Dominic St-Laurent
 * Gère le menu mobile (hamburger) et autres fonctionnalités globales
 */

document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu hamburger en mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
        
        // Ferme le menu quand on clique sur un lien
        const navLinkItems = document.querySelectorAll('.nav-links a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('show');
                }
            });
        });
    }
    
    // Ferme le menu en cliquant ailleurs dans la page
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-links') && 
            !event.target.closest('.mobile-menu-btn') && 
            navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
        }
    });
    
    // Menu collant lors du scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('floating');
            } else {
                header.classList.remove('floating');
            }
        });
    }
}); 