window.addEventListener('load', function() {
    // Navigation menu functionality
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // Make sure ScrollReveal is loaded
    if (typeof ScrollReveal === 'undefined') {
        console.error('ScrollReveal not loaded');
        return;
    }

    // Initialize ScrollReveal
    const sr = ScrollReveal({
        distance: '20px',
        duration: 1000,
        delay: 200,
        reset: false,
        easing: 'ease',
        scale: 1,
        viewFactor: 0.2,
        mobile: true,
        beforeReveal: function(el) {
            el.style.visibility = 'visible';
        }
    });
    // Reveal home section
    sr.reveal('.home__data', {
        origin: 'top',
        distance: '40px',
        duration: 1000,
        delay: 200
    });

    sr.reveal('.home__title', {
        origin: 'left',
        distance: '60px',
        duration: 1000,
        delay: 400
    });

    sr.reveal('.button', {
        origin: 'bottom',
        distance: '20px',
        duration: 800,
        delay: 600
    });

    sr.reveal('.home__social-icon', {
        origin: 'right',
        distance: '30px',
        duration: 800,
        interval: 200
    });

    // Reveal skills section
    sr.reveal('.skills-section', {
        origin: 'bottom',
        distance: '40px',
        duration: 1000,
        viewFactor: 0.2
    });

    sr.reveal('.skill-tag', {
        origin: 'bottom',
        distance: '20px',
        duration: 800,
        interval: 100,
        delay: 400,
        cleanup: true
    });

    // Reveal project cards
    sr.reveal('.project-card', {
        origin: 'bottom',
        distance: '30px',
        duration: 800,
        interval: 200,
        scale: 0.98,
        cleanup: true,
        viewFactor: 0.2
    });

    // Reveal navigation items
    sr.reveal('.nav__item', {
        origin: 'top',
        distance: '20px',
        duration: 600,
        interval: 100,
        cleanup: true
    });

    // Make sure all sections are visible initially
    document.querySelectorAll('.section').forEach(section => {
        section.style.visibility = 'visible';
    });

    // Ensure project cards are visible
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.visibility = 'visible';
    });

    // Ensure skills are visible
    document.querySelectorAll('.skill-tag').forEach(skill => {
        skill.style.visibility = 'visible';
    });
});

// Enhanced Skills Section Animation
document.addEventListener('DOMContentLoaded', function() {
    const skillsSection = document.querySelector('.skills-section');
    const skillTags = document.querySelectorAll('.skill-tag');
    
    // Intersection Observer for skills section
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };
    
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate skill tags with stagger effect
                const tags = entry.target.querySelectorAll('.skill-tag');
                tags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.opacity = '1';
                        tag.style.transform = 'translateY(0)';
                    }, index * 50);
                });
            }
        });
    }, observerOptions);
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // Add ripple effect on click
    skillTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add disappear animation on double-click
        tag.addEventListener('dblclick', function() {
            this.classList.add('disappear');
            setTimeout(() => {
                this.style.display = 'none';
            }, 500);
        });
        
        // Add random floating animation on hover
        tag.addEventListener('mouseenter', function() {
            this.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
        });
    });
});