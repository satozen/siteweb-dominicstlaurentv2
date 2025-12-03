// Gallery Animation
// Simple staggered animation for gallery items including testimonial

document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Intersection Observer to detect when the gallery comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger animation with staggered delays
                galleryItems.forEach((item, index) => {
                    const delay = parseFloat(item.getAttribute('data-delay')) || 0;
                    
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, delay * 1000);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Start observing the gallery grid
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        observer.observe(galleryGrid);
    }
});
