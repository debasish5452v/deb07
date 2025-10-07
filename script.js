<script src="https://unpkg.com/scrollreveal"></script>
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
}
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
});
sr.reveal('.home', {});
sr.reveal('.home__title', { delay: 100 });
sr.reveal('.button', { delay: 200 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.about__img', { delay: 400 });
sr.reveal('.about__subtitle, .about__text', { delay: 500 });
sr.reveal('.skills-section', { delay: 600 });
sr.reveal('.project-card', { interval: 200 });

// Enhanced Skills Section Animation
document.addEventListener('DOMContentLoaded', function() {
    const skillsSection = document.querySelector('.skills-section');
    const skillTags = document.querySelectorAll('.skill-tag');
    
    // Intersection Observer for skills section
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const tags = entry.target.querySelectorAll('.skill-tag');
                tags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.classList.add('animate-in');
                    }, index * 100);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
    });
    
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