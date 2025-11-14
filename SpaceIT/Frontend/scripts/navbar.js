// Mobil menü toggle funkcionalitás
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (mobileMenuToggle && navbarMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        // Menü bezárása linkre kattintáskor
        const navbarLinks = document.querySelectorAll('.navbar-link');
        navbarLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navbarMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            });
        });
        
        // Menü bezárása kattintáskor a menün kívülre
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navbarMenu.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navbarMenu.classList.contains('active')) {
                navbarMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
    
    // Smooth scroll a navigációs linkekhez
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Navbar elrejtése görgetéskor
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const currentScroll = window.pageYOffset;
                
                // Ha lefelé görgetünk és elértük a 100px-t, elrejtjük
                if (currentScroll > lastScroll && currentScroll > 100) {
                    navbar.classList.add('hidden');
                } 
                // Ha felfelé görgetünk, megjelenítjük
                else if (currentScroll < lastScroll) {
                    navbar.classList.remove('hidden');
                }
                
                // Oldal tetején mindig látható
                if (currentScroll <= 50) {
                    navbar.classList.remove('hidden');
                }
                
                lastScroll = currentScroll;
                ticking = false;
            });
            
            ticking = true;
        }
    });
    
    // CTA gomb kattintás kezelése
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Itt hozzáadhatod a saját funkcionalitásodat
            console.log('CTA gomb kattintva - Fedezd fel a lehetőségeid');
            // Például: window.location.href = '#szolgaltatasaink';
        });
    }
});

