/* ============================================
   DEMO BAKERY SHOP - Main JavaScript
   GSAP Animations, Scroll Effects, Interactions
   ============================================ */

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // ==================
    // PRELOADER
    // ==================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
            initAnimations();
            initCounters();
        }, 2200);
    });

    // Fallback: remove preloader after 4s max
    setTimeout(() => {
        preloader.classList.add('loaded');
    }, 4000);

    // ==================
    // VIDEO PROTECTION
    // ==================
    // Block right-click on entire page
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Block drag
    document.addEventListener('dragstart', (e) => e.preventDefault());

    // Block keyboard shortcuts for save/inspect
    document.addEventListener('keydown', (e) => {
        // Block Ctrl+S, Ctrl+U, Ctrl+Shift+I, F12
        if (
            (e.ctrlKey && (e.key === 's' || e.key === 'S' || e.key === 'u' || e.key === 'U')) ||
            (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I' || e.key === 'j' || e.key === 'J' || e.key === 'c' || e.key === 'C')) ||
            e.key === 'F12'
        ) {
            e.preventDefault();
        }
    });

    // Ensure all videos stay muted & play
    document.querySelectorAll('.cake-vid').forEach(vid => {
        vid.muted = true;
        vid.volume = 0;
        vid.disableRemotePlayback = true;
        vid.playsInline = true;
        vid.play().catch(() => {});
        // Re-play if paused
        vid.addEventListener('pause', () => { vid.play().catch(() => {}); });
    });

    // ==================
    // VIDEO PATHS MAP
    // ==================
    const videoMap = {
        chocolate: 'images/Chocolate%20Truffle%20Cake/Flow_delpmaspu_.mp4',
        redvelvet: 'images/Red%20Velvet%20Dream/Red_velvet_cake_with_frosting_806ddb5839.mp4',
        fruit: 'images/Fresh%20Fruit%20Cake/Ultra_realistic_360_degree_rotating_product_video__815907df33.mp4',
        birthday: 'images/Birthday%20Special%20Cake/Colorful_birthday_cake_rotating_00f8da4174.mp4',
        wedding: 'images/Custom%20Wedding%20Cake/Wedding_cake_rotating_in_studio_9a49f5091e.mp4',
    };

    // ==================
    // CSS CAKE COLOR THEMES
    // ==================
    const cakeThemes = {
        chocolate: { base: '#4a2c2a', frost: '#7B3F00', drip: '#3a1c1a', accent: '#e8567f' },
        redvelvet: { base: '#b02a2a', frost: '#f2e6e6', drip: '#8c1c1c', accent: '#f5c6c6' },
        fruit:     { base: '#f5e6c8', frost: '#fff8f0', drip: '#7ec850', accent: '#55efc4' },
        birthday:  { base: '#e8567f', frost: '#fdcb6e', drip: '#6c5ce7', accent: '#ff6b8a' },
        wedding:   { base: '#ffffff', frost: '#f8f0ff', drip: '#e8d5f5', accent: '#d4a041' },
    };

    // ==================
    // INIT THREE.JS CAKE SCENES
    // ==================
    const heroCanvas = document.getElementById('heroCakeCanvas');
    const customizerCanvas = document.getElementById('customizerCakeCanvas');

    // Delay slightly to ensure CSS layout is computed for canvas dimensions
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            if (heroCanvas && typeof CakeScene !== 'undefined') {
                CakeScene.create('hero', heroCanvas, { theme: 'chocolate', size: 1 });
            }
            if (customizerCanvas && typeof CakeScene !== 'undefined') {
                CakeScene.create('customizer', customizerCanvas, { theme: 'chocolate', size: 1 });
            }
        });
    });

    // ==================
    // HERO CAKE SELECTOR (Three.js)
    // ==================
    document.querySelectorAll('.hero-cake-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.hero-cake-pill').forEach(p => p.classList.remove('tw-active'));
            pill.classList.add('tw-active');

            const cake = pill.getAttribute('data-cake');
            const heroScene = CakeScene.get('hero');
            if (heroScene) {
                heroScene.bounce();
                setTimeout(() => { heroScene.setTheme(cake); }, 150);
            }
        });
    });

    // ==================
    // NAVIGATION
    // ==================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    // Scroll-based navbar style
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Hamburger
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ==================
    // GSAP ANIMATIONS
    // ==================
    function initAnimations() {
        // Hero animations
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        
        heroTl
            .from('.hero-badge', { y: -30, opacity: 0, duration: 0.8 })
            .from('.hero-title .line', { y: 80, opacity: 0, duration: 1, stagger: 0.15 }, '-=0.4')
            .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
            .from('.hero-description', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
            .from('.hero-buttons', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
            .from('.hero-stats .stat', { y: 30, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
            .from('.hero-cake-360', { x: 80, opacity: 0, scale: 0.85, duration: 1.2, ease: 'power3.out' }, '-=1.2')
            .from('#heroCakeSelector button', { y: 20, opacity: 0, duration: 0.4, stagger: 0.08 }, '-=0.5')
            .from('.scroll-indicator', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3');

        // Cake panels scroll animation
        document.querySelectorAll('.cake-panel').forEach((panel, i) => {
            ScrollTrigger.create({
                trigger: panel,
                start: 'top 80%',
                onEnter: () => {
                    panel.classList.add('visible');
                    
                    // Animate children
                    gsap.from(panel.querySelector('.cake-visual'), {
                        x: panel.classList.contains('reverse') ? 80 : -80,
                        opacity: 0,
                        duration: 1,
                        ease: 'power3.out'
                    });

                    gsap.from(panel.querySelector('.cake-info'), {
                        x: panel.classList.contains('reverse') ? -80 : 80,
                        opacity: 0,
                        duration: 1,
                        delay: 0.2,
                        ease: 'power3.out'
                    });
                },
                once: true
            });
        });

        // Section headers animation
        document.querySelectorAll('.section-header').forEach(header => {
            gsap.from(header.children, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%',
                    once: true,
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            });
        });

        // Gallery items
        document.querySelectorAll('.gallery-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    once: true,
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });

        // About section
        ScrollTrigger.create({
            trigger: '.about-section',
            start: 'top 70%',
            once: true,
            onEnter: () => {
                gsap.from('.about-img-1', { x: -80, opacity: 0, duration: 1, ease: 'power3.out' });
                gsap.from('.about-img-2', { x: 80, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out' });
                gsap.from('.experience-badge', { scale: 0, opacity: 0, duration: 0.8, delay: 0.5, ease: 'back.out(1.7)' });
                gsap.from('.about-content > *', { x: 60, opacity: 0, duration: 0.8, stagger: 0.1, delay: 0.3, ease: 'power3.out' });
            }
        });

        // Features animation
        document.querySelectorAll('.feature').forEach((feature, i) => {
            gsap.from(feature, {
                scrollTrigger: {
                    trigger: feature,
                    start: 'top 90%',
                    once: true,
                },
                x: 40,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });

        // Order section
        ScrollTrigger.create({
            trigger: '.order-section',
            start: 'top 70%',
            once: true,
            onEnter: () => {
                gsap.from('.order-info > *', { x: -50, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' });
                gsap.from('.order-form-container', { x: 50, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' });
            }
        });

        // Location cards
        document.querySelectorAll('.loc-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    once: true,
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });

        // Floating pastries parallax
        document.querySelectorAll('.floating-pastry').forEach(pastry => {
            gsap.to(pastry, {
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
                y: -100,
                rotation: 360,
                ease: 'none'
            });
        });
    }

    // ==================
    // COUNTER ANIMATION
    // ==================
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            
            ScrollTrigger.create({
                trigger: counter,
                start: 'top 90%',
                once: true,
                onEnter: () => {
                    gsap.to(counter, {
                        duration: 2,
                        ease: 'power2.out',
                        onUpdate: function() {
                            counter.textContent = Math.round(this.progress() * target);
                        }
                    });
                }
            });
        });
    }

    // ==================
    // 360° GALLERY CONTROLS
    // ==================
    const gallery360Video = document.getElementById('gallery360-video');

    document.querySelectorAll('.cake-select').forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('.cake-select').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Switch video source
            const model = btn.getAttribute('data-model');
            if (gallery360Video && videoMap[model]) {
                gallery360Video.style.opacity = '0';
                setTimeout(() => {
                    gallery360Video.src = videoMap[model];
                    gallery360Video.load();
                    gallery360Video.play().catch(() => {});
                    gallery360Video.style.opacity = '1';
                }, 300);
            }
        });
    });

    // ==================
    // CAKE CUSTOMIZATION
    // ==================
    const prices = { '500g': 499, '1kg': 699, '2kg': 1099 };
    const flavorPrices = { chocolate: 0, vanilla: 0, strawberry: 50, butterscotch: 50 };
    let currentSize = '500g';
    let currentFlavor = 'chocolate';

    // Size buttons
    document.querySelectorAll('.opt-btn[data-size]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.opt-btn[data-size]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSize = btn.getAttribute('data-size');
            updatePrice();

            // Update Three.js cake size
            const custScene = CakeScene.get('customizer');
            if (custScene) {
                const scaleMap = { '500g': 0.8, '1kg': 1.0, '2kg': 1.15 };
                custScene.setSize(scaleMap[currentSize] || 1.0);
            }
        });
    });

    // Flavor buttons — change cake color theme
    const flavorThemeMap = {
        chocolate: 'chocolate',
        vanilla: 'wedding',
        strawberry: 'redvelvet',
        butterscotch: 'fruit'
    };

    document.querySelectorAll('.flavor-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.flavor-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFlavor = btn.getAttribute('data-flavor');
            updatePrice();

            // Switch Three.js cake theme
            const mappedKey = flavorThemeMap[currentFlavor] || 'chocolate';
            const custScene = CakeScene.get('customizer');
            if (custScene) {
                custScene.bounce();
                setTimeout(() => { custScene.setTheme(mappedKey); }, 150);
            }
            // Update glow color
            const glow = document.getElementById('customizeGlow');
            const theme = cakeThemes[mappedKey];
            if (glow && theme) glow.style.background = 'radial-gradient(circle, ' + theme.accent + '22 0%, transparent 70%)';
        });
    });

    // Color theme buttons — change cake accent/theme color
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const color = btn.getAttribute('data-color');
            const custScene = CakeScene.get('customizer');
            if (custScene) {
                custScene.setAccentColor(color);
                custScene.bounce();
            }
        });
    });

    // Cake message input — show text on cake
    const cakeMessageInput = document.getElementById('cakeMessage');
    const cakeMsgPlate = document.getElementById('cakeMsgPlate');
    if (cakeMessageInput && cakeMsgPlate) {
        cakeMessageInput.addEventListener('input', () => {
            const msg = cakeMessageInput.value.trim();
            if (msg) {
                cakeMsgPlate.textContent = msg;
                cakeMsgPlate.classList.add('visible');
            } else {
                cakeMsgPlate.classList.remove('visible');
            }
        });
    }

    function updatePrice() {
        const total = (prices[currentSize] || 699) + (flavorPrices[currentFlavor] || 0);
        const priceEl = document.getElementById('totalPrice');
        if (priceEl) {
            gsap.to(priceEl, {
                duration: 0.3,
                scale: 1.1,
                ease: 'power2.out',
                onComplete: () => {
                    priceEl.textContent = `₹${total}`;
                    gsap.to(priceEl, { duration: 0.2, scale: 1 });
                }
            });
        }
    }

    // ==================
    // REVIEWS AUTO-SCROLL (duplicate cards for infinite)
    // ==================
    const reviewTrack = document.getElementById('reviewTrack');
    if (reviewTrack) {
        const cards = reviewTrack.innerHTML;
        reviewTrack.innerHTML = cards + cards; // Duplicate for seamless loop
    }

    // ==================
    // ORDER FORM
    // ==================
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation animation
            const formData = new FormData(orderForm);
            
            // Show success
            gsap.to(orderForm, {
                scale: 0.98,
                duration: 0.1,
                onComplete: () => {
                    gsap.to(orderForm, { scale: 1, duration: 0.3, ease: 'back.out(1.5)' });
                    
                    // Create success notification
                    showNotification('Order placed successfully! We will contact you shortly. 🎂');
                    orderForm.reset();
                }
            });
        });
    }

    // ==================
    // NOTIFICATION SYSTEM
    // ==================
    function showNotification(message) {
        const notif = document.createElement('div');
        notif.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #e8567f, #d63d66);
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            font-family: 'Poppins', sans-serif;
            font-size: 0.95rem;
            z-index: 10001;
            box-shadow: 0 10px 40px rgba(232,86,127,0.4);
            transform: translateX(120%);
            max-width: 350px;
        `;
        notif.textContent = message;
        document.body.appendChild(notif);

        gsap.to(notif, { x: 0, duration: 0.5, ease: 'back.out(1.5)' });
        
        setTimeout(() => {
            gsap.to(notif, { 
                x: '120%', 
                duration: 0.4, 
                ease: 'power2.in',
                onComplete: () => notif.remove() 
            });
        }, 4000);
    }

    // ==================
    // HERO PARTICLES (CSS-based fallback)
    // ==================
    function createCSSParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${2 + Math.random() * 4}px;
                height: ${2 + Math.random() * 4}px;
                background: ${['rgba(232,86,127,0.3)', 'rgba(212,160,65,0.3)', 'rgba(116,185,255,0.2)', 'rgba(255,255,255,0.15)'][Math.floor(Math.random() * 4)]};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${8 + Math.random() * 12}s ease-in-out infinite;
                animation-delay: ${Math.random() * -10}s;
            `;
            container.appendChild(particle);
        }
    }

    // Add particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
            25% { transform: translate(${20 + Math.random() * 30}px, -${40 + Math.random() * 60}px) scale(1.2); opacity: 0.6; }
            50% { transform: translate(-${10 + Math.random() * 20}px, -${80 + Math.random() * 80}px) scale(0.8); opacity: 0.4; }
            75% { transform: translate(${15 + Math.random() * 25}px, -${30 + Math.random() * 50}px) scale(1.1); opacity: 0.5; }
        }
    `;
    document.head.appendChild(style);
    createCSSParticles();

    // ==================
    // CURSOR GLOW EFFECT
    // ==================
    const cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(232,86,127,0.06) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s;
        opacity: 0;
    `;
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        cursorGlow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    // ==================
    // TILT EFFECT ON CARDS
    // ==================
    document.querySelectorAll('.review-card, .loc-card, .gallery-item').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            card.style.transition = 'transform 0.5s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });

    // ==================
    // SMOOTH REVEAL FOR SECTIONS
    // ==================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        if (section.id !== 'home') {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(section);
        }
    });

    // ==================
    // MAGNETIC BUTTONS
    // ==================
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            btn.style.transition = 'transform 0.4s ease';
        });

        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'none';
        });
    });

    console.log('🎂 Avni Bake Shop loaded successfully!');
});
