document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // THEME SWITCHER
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleIcon = themeToggleBtn.querySelector('i');
    
    // Check local storage or system preference
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        themeToggleIcon.className = 'fas fa-moon';
    } else {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        themeToggleIcon.className = 'fas fa-sun';
    }

    // Toggle theme action
    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('light-theme')) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeToggleIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
            themeToggleIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
    });

    // ==========================================================================
    // MOBILE NAVIGATION MENU
    // ==========================================================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
        });
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 120)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================================================
    // RESEARCH MODALS
    // ==========================================================================
    const researchCards = document.querySelectorAll('.research-card');
    const closeButtons = document.querySelectorAll('.modal-close');
    const modalOverlays = document.querySelectorAll('.modal-overlay');

    // Open modal
    researchCards.forEach(card => {
        card.addEventListener('click', () => {
            const paperId = card.getAttribute('data-paper');
            const targetModal = document.getElementById(`modal-${paperId}`);
            if (targetModal) {
                targetModal.classList.add('active');
                targetModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden'; // Prevent body scroll
            }
        });
    });

    // Close modal via close button
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            closeModal(modal);
        });
    });

    // Close modal by clicking outside
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay);
            }
        });
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });

    function closeModal(modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Re-enable body scroll
    }

    // ==========================================================================
    // MODAL TABS SWITCHER
    // ==========================================================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTabId = button.getAttribute('data-tab');
            const modalBody = button.closest('.modal-body');
            
            // Remove active class from sibling buttons in this modal
            const siblingButtons = modalBody.querySelectorAll('.tab-btn');
            siblingButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Hide all tab contents in this modal
            const tabContents = modalBody.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Show target tab content
            const targetContent = modalBody.querySelector(`#${targetTabId}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // ==========================================================================
    // SCROLL REVEAL EFFECT
    // ==========================================================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealOnScroll = () => {
        const triggerBottom = (window.innerHeight / 5) * 4;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            
            if (elTop < triggerBottom) {
                el.classList.add('revealed');
            }
        });
    };
    
    // Run once on load and on scroll
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger initial layout reveal

    // ==========================================================================
    // CONTACT FORM HANDLING
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Visual simulation of sending email
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending Message <i class="fas fa-spinner fa-spin ms-2"></i>';
            
            setTimeout(() => {
                submitBtn.innerHTML = 'Message Sent! <i class="fas fa-check ms-2"></i>';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)'; // Emerald Green
                
                // Clear form inputs
                contactForm.reset();
                
                // Reset button state after a delay
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = ''; // Resets to CSS gradient style
                }, 3000);
                
            }, 1500);
        });
    }
});
