document.addEventListener('DOMContentLoaded', () => {

    // 1. Mouse Parallax Effect (Membuat background terasa 'hidup')
    // Ini kuncinya agar tidak kaku seperti robot
    document.addEventListener('mousemove', (e) => {
        const blobs = document.querySelectorAll('.blob');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        blobs.forEach(blob => {
            const speed = blob.getAttribute('data-speed');
            const xOffset = (window.innerWidth - e.clientX * speed) / 100;
            const yOffset = (window.innerHeight - e.clientY * speed) / 100;

            blob.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // 2. Smooth Reveal (Animasi muncul saat scroll)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // --- MOBILE MENU LOGIC ---
    const hamburger = document.querySelector('.hamburger-v7');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    // Create mobile menu overlay dynamically if it doesn't exist (Strategy: easier than editing all HTMLs to include it, 
    // BUT we need links. Better to edit HTMLs to ensure links are correct or clone them from desktop).
    // Let's assume we will add the HTML manually or clone it here. 
    // CLONING APPROACH:
    if (!mobileMenu) {
        const newOverlay = document.createElement('div');
        newOverlay.className = 'mobile-menu-overlay';
        
        // Clone links from desktop nav
        const desktopLinks = document.querySelector('.nav-links-v7');
        if (desktopLinks) {
            // Get raw HTML but replace classes if needed. 
            // Better: just manually create standard links
            newOverlay.innerHTML = `
                <a href="index.html">Home</a>
                <a href="portfolio.html">Karya</a>
                <a href="about.html">Vibe Kami</a>
                <a href="contact.html">Ngobrol</a>
            `;
        }
        document.body.appendChild(newOverlay);
    }
    
    // Select again after ensuring existence
    const finalMobileMenu = document.querySelector('.mobile-menu-overlay');

    if (hamburger && finalMobileMenu) {
        const icon = hamburger.querySelector('i');
        
        hamburger.addEventListener('click', () => {
            finalMobileMenu.classList.toggle('active');
            
            // Toggle Icon
            if (finalMobileMenu.classList.contains('active')) {
                icon.classList.remove('bx-menu');
                icon.classList.add('bx-x');
            } else {
                icon.classList.remove('bx-x');
                icon.classList.add('bx-menu');
            }
        });
        
        // Close menu when link is clicked
        finalMobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                finalMobileMenu.classList.remove('active');
                icon.classList.remove('bx-x');
                icon.classList.add('bx-menu');
            });
        });
    }


    const animatedElements = document.querySelectorAll('.hero-text, .service-card, .cta-box, .project-card, .team-card, .text-col, .image-col');

    animatedElements.forEach((el, index) => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.1}s`; // Staggered delay
        observer.observe(el);
    });

    // 3. Navbar logic (Mengecil saat scroll)
    const nav = document.querySelector('.nav-v7');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.top = '10px';
        } else {
            nav.style.top = '24px';
        }
    });
});