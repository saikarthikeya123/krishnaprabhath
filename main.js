// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.innerWidth < 992) {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Allow the form to submit naturally to FormSubmit
        // The _autoresponse field in the form will handle the thank you message to the user
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-out');
    observer.observe(section);
});

// Add animation classes to elements
document.querySelectorAll('.feature, .pooja-card, .explore-card').forEach(element => {
    element.classList.add('fade-out');
    observer.observe(element);
});

// Add CSS class for fade animations
const style = document.createElement('style');
style.textContent = `
    .fade-out {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Mobile menu toggle
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');

    // Hide nav-links by default on mobile
    function hideMenu() {
        navLinks.classList.remove('show');
    }

    // Only add mobile menu button for screens < 992px
    function updateMenuBtn() {
        if (window.innerWidth < 992) {
            hideMenu(); // Always hide menu on resize to mobile
            if (!document.querySelector('.mobile-menu-btn')) {
                const mobileMenuBtn = document.createElement('button');
                mobileMenuBtn.classList.add('mobile-menu-btn');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                navbar.insertBefore(mobileMenuBtn, navLinks);
                mobileMenuBtn.addEventListener('click', () => {
                    navLinks.classList.toggle('show');
                    mobileMenuBtn.innerHTML = navLinks.classList.contains('show') 
                        ? '<i class="fas fa-times"></i>' 
                        : '<i class="fas fa-bars"></i>';
                });
            }
        } else {
            const btn = document.querySelector('.mobile-menu-btn');
            if (btn) btn.remove();
            navLinks.classList.remove('show');
        }
    }
    updateMenuBtn();
    window.addEventListener('resize', updateMenuBtn);

    // Remove previous click listeners to avoid duplicates
    navLinks.querySelectorAll('a').forEach(link => {
        link.onclick = null;
    });
    // Close menu on link click (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                navLinks.classList.remove('show');
                const btn = document.querySelector('.mobile-menu-btn');
                if (btn) btn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // Hide menu on page load (mobile)
    if (window.innerWidth < 992) {
        hideMenu();
    }
};

// Initialize mobile menu
createMobileMenu();

// Add WhatsApp click-to-chat functionality
const whatsappLink = document.querySelector('a[href^="https://wa.me"]');
if (whatsappLink) {
    whatsappLink.addEventListener('click', (e) => {
        e.preventDefault();
        const phone = '919676666750';
        const message = 'Hello! I would like to know more about Bhadradri Kshetra Dharshini.';
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    });
} 