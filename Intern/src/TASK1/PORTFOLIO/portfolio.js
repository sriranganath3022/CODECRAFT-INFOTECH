// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS library if needed (Animate On Scroll)
    // AOS.init();
    
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.nav-links');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const contactForm = document.getElementById('contactForm');
    const sections = document.querySelectorAll('section');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        }
        
        // Update active nav link on scroll
        updateActiveNavLink();
    });
    
    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Project filtering functionality
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showFormAlert('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate form submission
            showFormAlert('Your message has been sent! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // In a real application, you would send the form data to a server here
            console.log('Form submitted:', { name, email, subject, message });
        });
    }
    
    // Skill bars animation
    const skillLevels = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillLevels.forEach(skill => {
            skill.style.width = '0';
            
            // Get width value from style attribute
            const targetWidth = skill.getAttribute('style').split('width:')[1].split('%')[0].trim();
            
            // Reset width to 0 for animation
            skill.style.width = '0';
            
            // Animate after a small delay
            setTimeout(() => {
                skill.style.width = targetWidth + '%';
            }, 200);
        });
    }
    
    // Animate skill bars when they come into view
    function checkSkillBarsVisibility() {
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;
        
        const position = skillsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (position.top < windowHeight && position.bottom >= 0) {
            animateSkillBars();
            // Remove event listener once triggered
            window.removeEventListener('scroll', checkSkillBarsVisibility);
        }
    }
    
    // Add event listener for skill bars animation
    window.addEventListener('scroll', checkSkillBarsVisibility);
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Helper function to show form alerts
    function showFormAlert(message, type) {
        // Check if an alert already exists and remove it
        const existingAlert = document.querySelector('.form-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create new alert
        const alertElement = document.createElement('div');
        alertElement.className = `form-alert ${type}`;
        alertElement.textContent = message;
        
        // Add alert to the form
        contactForm.insertAdjacentElement('afterbegin', alertElement);
        
        // Remove alert after 3 seconds
        setTimeout(() => {
            alertElement.remove();
        }, 3000);
    }
    
    // Initialize animations and events
    animateSkillBars();
    updateActiveNavLink();
    
    // Add back-to-top functionality
    const backToTop = document.querySelector('.back-to-top a');
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});