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

    const animatedElements = document.querySelectorAll('.hero-text, .service-card, .cta-box');

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