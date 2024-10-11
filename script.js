document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuItems = mobileMenu.querySelectorAll('li');

    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.remove('hidden');
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-slideUp');
            }, index * 100);
        });
    });

    closeMenuButton.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        menuItems.forEach(item => item.classList.remove('animate-slideUp'));
    });

    // Add scroll animation functionality
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });
});

// Add any other JavaScript functions you need for your site here
