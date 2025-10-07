document.addEventListener('DOMContentLoaded', function() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // Initialize ScrollReveal only once
    const sr = ScrollReveal({
        origin: 'top',
        distance: '30px',
        duration: 800,
        reset: false,
        useDelay: 'once',
        mobile: true,
        viewFactor: 0.2,
        beforeReveal: function(el) {
            el.style.transform = 'translate3d(0, 0, 0)';
            el.style.opacity = '1';
        }
    });
    // Reveal elements
    sr.reveal('.home', {
        distance: '0px',
        opacity: 1
    });
    
    sr.reveal('.home__title', { 
        delay: 100,
        distance: '20px',
        origin: 'left'
    });
    
    sr.reveal('.button', { 
        delay: 200,
        distance: '20px',
        origin: 'bottom'
    });
    
    sr.reveal('.home__social-icon', { 
        interval: 100,
        distance: '20px',
        origin: 'right'
    });
    
    sr.reveal('.about__img', { 
        delay: 200,
        distance: '30px',
        origin: 'left'
    });
    
    sr.reveal('.about__subtitle, .about__text', { 
        delay: 300,
        distance: '30px'
    });
    
    sr.reveal('.skills-section', { 
        delay: 200,
        distance: '20px'
    });
    
    sr.reveal('.project-card', { 
        interval: 100,
        distance: '30px',
        origin: 'bottom'
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