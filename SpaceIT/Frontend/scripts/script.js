// Navbar funkcionalitás
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (mobileMenuToggle && navbarMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        const navbarLinks = document.querySelectorAll('.navbar-link');
        navbarLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navbarMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            });
        });
        
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navbarMenu.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navbarMenu.classList.contains('active')) {
                navbarMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
    
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
    
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > lastScroll && currentScroll > 100) {
                    navbar.classList.add('hidden');
                } 
                else if (currentScroll < lastScroll) {
                    navbar.classList.remove('hidden');
                }
                
                if (currentScroll <= 50) {
                    navbar.classList.remove('hidden');
                }
                
                lastScroll = currentScroll;
                ticking = false;
            });
            
            ticking = true;
        }
    });
    
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            console.log('CTA gomb kattintva - Fedezd fel a lehetőségeid');
        });
    }

    // Csillagok generálása
    const starsContainer = document.getElementById('starsContainer');
    const mainSection = document.querySelector('.main-section');
    
    if (!starsContainer || !mainSection) return;
    
    function getStarCount() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const area = width * height;
        return Math.floor(area / 10000);
    }
    
    function createStars() {
        starsContainer.innerHTML = '';
        
        const starCount = getStarCount();
        const sizes = ['small', 'medium', 'large'];
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = `star ${sizes[Math.floor(Math.random() * sizes.length)]}`;
            
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.animationDuration = (2 + Math.random() * 2) + 's';
            
            starsContainer.appendChild(star);
        }
    }
    
    createStars();
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            createStars();
        }, 250);
    });
    
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('.about-section');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    let lastScrollStars = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        const mainSectionHeight = mainSection.offsetHeight;
        
        if (currentScroll < mainSectionHeight) {
            const parallaxValue = currentScroll * 0.5;
            starsContainer.style.transform = `translateY(${parallaxValue}px)`;
        }
        
        lastScrollStars = currentScroll;
    }, { passive: true });
    
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
        
        nextSection.style.opacity = '0';
        nextSection.style.transform = 'translateY(50px)';
        nextSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        observer.observe(nextSection);
    }

    // About section animáció
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const aboutImage = entry.target.querySelector('.about-image');
                    const aboutContent = entry.target.querySelector('.about-content');
                    
                    if (aboutImage) {
                        aboutImage.style.opacity = '1';
                        aboutImage.style.transform = 'translateX(0)';
                    }
                    
                    if (aboutContent) {
                        aboutContent.style.opacity = '1';
                        aboutContent.style.transform = 'translateX(0)';
                    }
                }
            });
        }, {
            threshold: 0.2
        });
        
        const aboutImage = aboutSection.querySelector('.about-image');
        const aboutContent = aboutSection.querySelector('.about-content');
        
        if (aboutImage) {
            aboutImage.style.opacity = '0';
            aboutImage.style.transform = 'translateX(-50px)';
            aboutImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        
        if (aboutContent) {
            aboutContent.style.opacity = '0';
            aboutContent.style.transform = 'translateX(50px)';
            aboutContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        
        aboutObserver.observe(aboutSection);
    }

    // Services section animáció
    const servicesSection = document.querySelector('.services-section');
    if (servicesSection) {
        const servicesObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const serviceCards = entry.target.querySelectorAll('.service-card');
                    serviceCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, {
            threshold: 0.1
        });
        
        const serviceCards = servicesSection.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        servicesObserver.observe(servicesSection);
    }
});

