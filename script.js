// Single DOMContentLoaded - Everything loads here once DOM is ready
document.addEventListener('DOMContentLoaded', function() {

    // ===== NAVIGATION MENU TOGGLE =====
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // ===== SCROLL REVEAL ANIMATIONS =====
    const sr = ScrollReveal({
        duration: 1000,
        distance: '60px',
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        reset: true
    });

    // Hero section animations
    sr.reveal('.home__title', {
        origin: 'left',
        distance: '50px',
        duration: 800,
        delay: 50
    });

    sr.reveal('.button', {
        origin: 'bottom',
        delay: 300,
        duration: 600
    });

    // Social icons with stagger effect
    sr.reveal('.home__social-icon', {
        origin: 'right',
        interval: 150,
        distance: '30px',
        duration: 500
    });

    // About section with image focus
    sr.reveal('.about__img', {
        origin: 'left',
        distance: '50px',
        duration: 700
    });

    sr.reveal('.about__text-content', {
        origin: 'right',
        delay: 200,
        interval: 80
    });

    // Skills section with grid animation - Using ScrollReveal only
    sr.reveal('.skill-tag', {
        origin: 'bottom',
        interval: 80,
        distance: '20px',
        duration: 500,
        reset: true
    });

    // Project cards with stagger and scale
    sr.reveal('.project-card', {
        origin: 'bottom',
        interval: 200,
        distance: '40px',
        duration: 600
    });

    // Competitive Programming profiles animation
    sr.reveal('.cp-profiles .section-title', {
        origin: 'top',
        distance: '50px',
        duration: 800
    });

    sr.reveal('.cp-subtitle', {
        origin: 'top',
        distance: '30px',
        duration: 600,
        delay: 100
    });

    sr.reveal('.cp-card', {
        origin: 'bottom',
        interval: 150,
        distance: '50px',
        duration: 700
    });

    // Navigation menu animation
    sr.reveal('.nav__item', {
        origin: 'top',
        interval: 80,
        distance: '15px',
        duration: 500,
        delay: 50
    });

    // Add ripple effect on skill tags - click and double-click effects
    const skillTags = document.querySelectorAll('.skill-tag');
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
        
        tag.addEventListener('dblclick', function() {
            this.classList.add('disappear');
            setTimeout(() => {
                this.style.display = 'none';
            }, 500);
        });
        
        tag.addEventListener('mouseenter', function() {
            this.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
        });
    });

    // ===== CHATBOT FUNCTIONALITY =====
    const toggleBtn = document.getElementById('chatbot-toggle');
    const closeBtn = document.getElementById('chatbot-close');
    const chatWindow = document.getElementById('chatbot-window');
    const messagesArea = document.getElementById('chatbot-messages');
    const inputField = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send');

    const responses = {
        'hi': '👋 Hey! I\'m here to help. Ask me about skills, projects, experience, or anything else!',
        'hello': '👋 Welcome! I\'m Debasish\'s AI assistant. How can I assist you today?',
        'skills': '💻 Debasish is skilled in:\n• Frontend: HTML, CSS, JavaScript, React\n• Backend: Node.js, Django, Python\n• Database: MongoDB, SQL\n• And more! What specifically interests you?',
        'project': '🚀 Debasish has built amazing full-stack projects! Check the Projects section for detailed portfolios with code and live demos.',
        'contact': '📱 You can connect with Debasish through:\n• LinkedIn\n• GitHub\n• Email\nAll links are available on the website!',
        'about': '👨‍💻 Debasish is a passionate Full Stack Web Developer who loves building beautiful, functional web experiences and solving real-world problems!',
        'help': '🆘 I can help you with:\n• Skills & expertise\n• Projects & portfolio\n• Experience & background\n• Contact information\nJust ask!'
    };

    function getResponse(msg) {
        msg = msg.toLowerCase().trim();
        for (let key in responses) {
            if (msg.includes(key)) {
                return responses[key];
            }
        }
        return '🤔 I\'m not sure about that! Try asking me about:\n• Skills & expertise\n• Projects\n• Experience\n• How to contact\n• Or just say "help"!';

    }

    function addMsg(text, isUser) {
        const msgDiv = document.createElement('div');
        
        if (isUser) {
            msgDiv.style.cssText = `
                padding: 11px 16px;
                border-radius: 14px;
                max-width: 80%;
                word-wrap: break-word;
                font-size: 14px;
                background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
                color: white;
                align-self: flex-end;
                box-shadow: 0 2px 8px rgba(99, 102, 241, 0.25);
                font-weight: 500;
                line-height: 1.4;
                animation: fadeIn 0.3s ease;
            `;
        } else {
            msgDiv.style.cssText = `
                padding: 11px 16px;
                border-radius: 14px;
                max-width: 80%;
                word-wrap: break-word;
                font-size: 14px;
                background: #e5e7eb;
                color: #1f2937;
                align-self: flex-start;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
                line-height: 1.4;
                animation: fadeIn 0.3s ease;
            `;
        }
        
        msgDiv.innerText = text;
        messagesArea.appendChild(msgDiv);
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    function send() {
        const msg = inputField.value.trim();
        if (!msg) return;
        
        addMsg(msg, true);
        inputField.value = '';
        
        setTimeout(() => {
            addMsg(getResponse(msg), false);
        }, 400);
    }

    // Chatbot event listeners
    let chatbotOpened = false;
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            chatWindow.style.display = 'flex';
            toggleBtn.style.display = 'none';
            
            // Show welcome message on first open
            if (!chatbotOpened) {
                setTimeout(() => {
                    addMsg('👋 Hi! I\'m Debasish\'s AI Assistant.', false);
                }, 300);
                chatbotOpened = true;
            }
            
            inputField.focus();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            chatWindow.style.display = 'none';
            toggleBtn.style.display = 'flex';
        });
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', send);
    }

    if (inputField) {
        inputField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                send();
            }
        });
    }
});
