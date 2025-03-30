document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navItems = document.querySelectorAll('.nav-item');

    // Change navigation bar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Handle active state for navigation items
    function updateActiveNavItem() {
        const scrollPosition = window.scrollY;

        document.querySelectorAll('.page-section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav items
                navItems.forEach(item => {
                    item.classList.remove('active');
                });

                // Add active class to current section's nav item
                const activeNavItem = document.querySelector(`.nav-item[href="#${sectionId}"]`);
                if (activeNavItem) {
                    activeNavItem.classList.add('active');
                }
            }
        });
    }

    // Update active nav item on scroll
    window.addEventListener('scroll', updateActiveNavItem);

    // Smooth scrolling for navigation links
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });

            // Update active class
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Initial check for active nav item
    updateActiveNavItem();
});