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
    distance: '30px',
    duration: 300,
    reset: false,
    delay: 0,
    easing: 'ease-out',
    mobile: true,
    useDelay: 'once',
    viewFactor: 0.1
});
sr.reveal('.home', { delay: 0 });
sr.reveal('.home__title', { delay: 50 });
sr.reveal('.button', { delay: 100 });
sr.reveal('.home__social-icon', { interval: 100 });
sr.reveal('.about__img', { delay: 150 });
sr.reveal('.about__subtitle, .about__text', { delay: 200 });
sr.reveal('.skills-section', { delay: 250 });
sr.reveal('.project-card', { interval: 100 });

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