/* ========================================
   Script Functions
   Handles mobile menu toggle and form validation.
   Matches HTML classes from other pages.
   ======================================== */

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            // Toggle the active class to show/hide navigation
            navLinks.classList.toggle('active');
            
            // Animate the toggle button
            const arrowDirection = menuToggle.getAttribute('aria-expanded') === 'true' ? 
                '\u2190' : '\u2192';
            menuToggle.setAttribute('aria-expanded', !menuToggle.getAttribute('aria-expanded'));
        });
    }
});

// Simple Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            let isValid = true;
            const formElements = contactForm.querySelectorAll('[required]');
            
            formElements.forEach(element => {
                const name = element.tagName.toLowerCase();
                const value = element.value.trim();
                
                // Check if required fields are not empty
                if (value === '') {
                    isValid = false;
                    
                    // Add visual feedback
                    element.style.borderColor = 'red';
                    
                    // Focus on the first empty field
                    if (!contactForm.querySelector('.form-group input:focus, .form-group select:focus')) {
                        contactForm.firstElementChild.querySelector('input').focus();
                    }
                } else {
                    // Reset border color to default
                    element.style.borderColor = '';
                }
            });
            
            // Validate email format for the email field
            const emailInput = document.getElementById('email');
            if (emailInput && !isValid) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value)) {
                    isValid = false;
                    emailInput.style.borderColor = 'red';
                }
            }
            
            // Check discipline selection (custom requirement)
            const disciplineSelect = document.getElementById('engineering-discipline');
            if (disciplineSelect && !isValid) {
                if (disciplineSelect.value === '') {
                    isValid = false;
                    disciplineSelect.style.borderColor = 'red';
                }
            }
            
            // Stop submission if form is invalid
            if (!isValid) {
                event.preventDefault();
                
                // Optional: Show a simple alert to guide the user
                const messages = contactForm.querySelectorAll('[required]');
                let errorMessages = [];
                
                messages.forEach(element => {
                    if (element.value.trim() === '') {
                        const fieldName = element.getAttribute('data-field-name') || 
                                         element.tagName.toLowerCase();
                        errorMessages.push(`Please fill in ${fieldName}.`);
                    }
                });
                
                alert(errorMessages.length > 0 ? 
                    "Please complete all required fields before submitting." : 
                    "All required fields completed. Form will be submitted.");
            }
            
            // If validation passes, submit the form (normally this would go to server)
            // For demonstration purposes:
            if (isValid) {
                console.log('Form validated successfully!');
                console.log('Values:', new FormData(contactForm));
                
                // In a real implementation, you would redirect or send to backend here
                alert('Thank you for your message! We will contact you shortly.');
                contactForm.reset();
            }
        });
    }
});

// Optional: Add simple animation on scroll (intersection observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Apply observer to cards for fade-in effect
document.querySelectorAll('.card, .service-section').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// Handle keyboard navigation for accessibility on mobile menu
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const toggleBtn = document.getElementById('menuToggle');
        if (toggleBtn && !toggleBtn.classList.contains('active')) {
            toggleBtn.click();
        }
    }
});