// Csillagok generálása és animálása
document.addEventListener('DOMContentLoaded', function() {
    const starsContainer = document.getElementById('starsContainer');
    const mainSection = document.querySelector('.main-section');
    
    if (!starsContainer || !mainSection) return;
    
    // Csillagok számának meghatározása a képernyő mérete alapján
    function getStarCount() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const area = width * height;
        // Körülbelül 1 csillag 10000 pixel²-enként
        return Math.floor(area / 10000);
    }
    
    // Csillagok létrehozása
    function createStars() {
        // Töröljük a meglévő csillagokat
        starsContainer.innerHTML = '';
        
        const starCount = getStarCount();
        const sizes = ['small', 'medium', 'large'];
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = `star ${sizes[Math.floor(Math.random() * sizes.length)]}`;
            
            // Véletlenszerű pozíció
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            
            // Véletlenszerű animációs késleltetés
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.animationDuration = (2 + Math.random() * 2) + 's';
            
            starsContainer.appendChild(star);
        }
    }
    
    // Kezdeti csillagok létrehozása
    createStars();
    
    // Újracsillagozás ablak átméretezéskor
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            createStars();
        }, 250);
    });
    
    // Smooth scroll a következő section-re
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const nextSection = document.querySelector('.next-section');
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Scroll esemény - parallax effekt (opcionális)
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        const mainSectionHeight = mainSection.offsetHeight;
        
        if (currentScroll < mainSectionHeight) {
            // Parallax effekt a csillagoknak
            const parallaxValue = currentScroll * 0.5;
            starsContainer.style.transform = `translateY(${parallaxValue}px)`;
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    // Intersection Observer a következő section megjelenítéséhez
    const nextSection = document.querySelector('.next-section');
    if (nextSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Kezdeti állapot
        nextSection.style.opacity = '0';
        nextSection.style.transform = 'translateY(50px)';
        nextSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        observer.observe(nextSection);
    }
});

