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
        'technologies': '💻 Debasish works with:\n• Frontend: React, Next.js, JavaScript, TypeScript\n• Backend: Node.js, Express, Django, Flask, FastAPI\n• Database: MongoDB, PostgreSQL, SQL\n• Tools: Git, Linux, Docker\n• Languages: C/C++, Python, Java',
        'work with': '💻 Debasish works with:\n• Frontend: React, Next.js, JavaScript, TypeScript\n• Backend: Node.js, Express, Django, Flask, FastAPI\n• Database: MongoDB, PostgreSQL, SQL\n• Tools: Git, Linux, Docker\n• Languages: C/C++, Python, Java',
        'recent projects': '🚀 Recent Projects:\n1. AI-Powered Content Creation Platform - Full-stack SaaS with React, Node.js, PostgreSQL\n2. Real-Time Finance Tracker - Next.js with JWT auth and analytics dashboard\n3. Face Recognition Attendance System - OpenCV + Django\nCheck the Projects section for live demos and code!',
        'projects': '🚀 Debasish has built amazing full-stack projects! Check the Projects section for detailed portfolios with code and live demos.',
        'contact': '📱 You can connect with Debasish through:\n• LinkedIn: linkedin.com/in/debasish-mahata-081274245\n• GitHub: github.com/debasish5452v\n• Email: Available on the website\nAll links are in the footer!',
        'work': '💼 Interested in working together? Debasish is available for:\n• Full-stack development projects\n• Web application development\n• API development\nReach out via LinkedIn or the contact information on the website!',
        'hi': '👋 Hey! I\'m here to help. Ask me about skills, projects, experience, or anything else!',
        'hello': '👋 Welcome! I\'m Debasish\'s AI assistant. How can I assist you today?',
        'skills': '💻 Debasish is skilled in:\n• Frontend: React, Next.js, JavaScript, TypeScript\n• Backend: Node.js, Express, Django, Flask\n• Database: MongoDB, PostgreSQL, SQL\n• Languages: C/C++, Python, Java\nWhat specifically interests you?',
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
        const msgContainer = document.createElement('div');
        msgContainer.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 4px;
            ${isUser ? 'align-items: flex-end;' : 'align-items: flex-start;'}
        `;

        const msgDiv = document.createElement('div');
        
        if (isUser) {
            msgDiv.style.cssText = `
                padding: 10px 14px;
                border-radius: 12px;
                max-width: 75%;
                word-wrap: break-word;
                font-size: 13px;
                background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
                color: white;
                font-weight: 400;
                line-height: 1.5;
                animation: fadeIn 0.3s ease;
            `;
        } else {
            const botMsgWrapper = document.createElement('div');
            botMsgWrapper.style.cssText = `
                display: flex;
                gap: 8px;
                align-items: flex-start;
                max-width: 85%;
            `;

            const avatar = document.createElement('div');
            avatar.style.cssText = `
                width: 32px;
                height: 32px;
                background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                flex-shrink: 0;
            `;
            avatar.innerText = '🤖';

            msgDiv.style.cssText = `
                padding: 10px 14px;
                border-radius: 12px;
                word-wrap: break-word;
                font-size: 13px;
                background: #f3f4f6;
                color: #374151;
                line-height: 1.5;
                animation: fadeIn 0.3s ease;
                font-weight: 400;
            `;

            botMsgWrapper.appendChild(avatar);
            botMsgWrapper.appendChild(msgDiv);
            msgContainer.appendChild(botMsgWrapper);
        }
        
        if (isUser) {
            msgDiv.innerText = text;
            msgContainer.appendChild(msgDiv);
        } else {
            msgDiv.innerText = text;
        }

        const timestamp = document.createElement('div');
        timestamp.style.cssText = `
            font-size: 10px;
            color: #9ca3af;
            padding: 0 ${isUser ? '14px' : '40px'};
            font-weight: 400;
        `;
        const now = new Date();
        timestamp.innerText = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        msgContainer.appendChild(timestamp);
        
        messagesArea.appendChild(msgContainer);
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    function addQuickQuestions() {
        const questionsContainer = document.createElement('div');
        questionsContainer.style.cssText = `
            padding: 0 0 12px 0;
            display: flex;
            flex-direction: column;
            gap: 6px;
            animation: fadeIn 0.3s ease;
            margin-top: 8px;
        `;

        const label = document.createElement('div');
        label.style.cssText = `
            font-size: 12px;
            color: #6b7280;
            font-weight: 500;
            margin-bottom: 6px;
            padding: 0 0 0 40px;
        `;
        label.innerText = 'Quick questions:';
        questionsContainer.appendChild(label);

        const questions = [
            'What technologies do you work with?',
            'Tell me about your recent projects',
            'How can I contact you for work?'
        ];

        const buttonsWrapper = document.createElement('div');
        buttonsWrapper.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 6px;
            padding: 0 0 0 40px;
        `;

        questions.forEach(question => {
            const btn = document.createElement('button');
            btn.style.cssText = `
                padding: 9px 12px;
                background: #ffffff;
                border: 1px solid #d1d5db;
                border-radius: 8px;
                color: #374151;
                font-size: 12px;
                text-align: left;
                cursor: pointer;
                transition: all 0.2s;
                font-family: 'Poppins', sans-serif;
                font-weight: 400;
            `;
            btn.innerText = question;
            
            btn.addEventListener('mouseenter', () => {
                btn.style.background = '#f9fafb';
                btn.style.borderColor = '#9ca3af';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.background = '#ffffff';
                btn.style.borderColor = '#d1d5db';
            });
            
            btn.addEventListener('click', () => {
                inputField.value = question;
                send();
            });
            
            buttonsWrapper.appendChild(btn);
        });

        questionsContainer.appendChild(buttonsWrapper);
        messagesArea.appendChild(questionsContainer);
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
    const chatIcon = document.getElementById('chat-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const isOpen = chatWindow.style.display === 'flex';
            
            if (!isOpen) {
                // Open chatbot
                chatWindow.style.display = 'flex';
                chatIcon.style.display = 'none';
                closeIcon.style.display = 'block';
                
                // Show welcome message on first open
                if (!chatbotOpened) {
                    setTimeout(() => {
                        addMsg('Hello! I\'m Debasish\'s Portfolio Assistant.\nHow can I help you?', false);
                        setTimeout(() => {
                            addQuickQuestions();
                        }, 200);
                    }, 300);
                    chatbotOpened = true;
                }
                
                inputField.focus();
            } else {
                // Close chatbot
                chatWindow.style.display = 'none';
                chatIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            }
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
