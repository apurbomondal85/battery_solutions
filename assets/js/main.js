
// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Preloader
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    gsap.to(preloader, {
        opacity: 0,
        duration: 0.5,
        onComplete: function () {
            preloader.style.display = 'none';
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animated counters
function animateCounters() {
    const counters = document.querySelectorAll('.counter-value');

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 200;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '%';
                setTimeout(updateCounter, 10);
            } else {
                counter.textContent = target + '%';
            }
        };

        updateCounter();
    });
}

// Initialize counters when section is in view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const featuresSection = document.getElementById('features');
if (featuresSection) {
    observer.observe(featuresSection);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Form submission with ripple effect
const submitBtn = document.getElementById('submitBtn');
if (submitBtn) {
    submitBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // Simple form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Ripple effect
        const ripple = document.createElement('span');
        const rect = submitBtn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        submitBtn.appendChild(ripple);

        // Simulate form submission
        setTimeout(() => {
            alert('Thank you for your inquiry! We will get back to you within 24 hours.');
            document.getElementById('inquiryForm').reset();

            // Remove ripple after animation
            ripple.remove();
        }, 600);
    });
}

// Hero animation
gsap.from('.hero h1', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: 'power3.out'
});

gsap.from('.hero-subtitle', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    delay: 0.3,
    ease: 'power3.out'
});

gsap.from('.cta-buttons', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    delay: 0.6,
    ease: 'power3.out'
});

// Create energy particles for hero section
function createEnergyParticles() {
    const heroVisual = document.querySelector('.hero-visual');
    if (!heroVisual) return;

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'energy-particle';

        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;

        // Random size
        const size = Math.random() * 8 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random animation
        const duration = Math.random() * 3 + 2;
        particle.style.animation = `float ${duration}s ease-in-out infinite`;

        heroVisual.appendChild(particle);
    }
}

// Initialize energy particles
createEnergyParticles();

// Update active nav link on scroll
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
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

// Feature Selector Interactions
document.addEventListener('DOMContentLoaded', function () {
    // Feature Selector
    const selectorItems = document.querySelectorAll('.selector-item');
    const indicatorDots = document.querySelectorAll('.indicator-dot');
    const visualContents = document.querySelectorAll('.visual-content');

    selectorItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            // Update selector items
            selectorItems.forEach(item => item.classList.remove('active'));
            this.classList.add('active');

            // Update indicator dots
            indicatorDots.forEach(dot => dot.classList.remove('active'));
            indicatorDots[index].classList.add('active');

            // Update visual content
            visualContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('data-index') == index) {
                    setTimeout(() => {
                        content.classList.add('active');
                    }, 10);
                }
            });
        });
    });

    // Animate progress circles
    function animateCircles() {
        const circles = document.querySelectorAll('.circle-progress');
        circles.forEach(circle => {
            const percent = circle.getAttribute('data-percent');
            const radius = circle.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (percent / 100 * circumference);

            circle.style.strokeDashoffset = offset;
        });
    }

    // Initialize circle animations when section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCircles();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const featuresSection = document.querySelector('.features-section-modern');
    if (featuresSection) observer.observe(featuresSection);

    // Testimonial Carousel
    const slides = document.querySelectorAll('.testimonial-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showSlide(index));
    });

    // Auto-rotate testimonials
    setInterval(() => {
        if (slides.length > 0) {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
    }, 8000);

    // Contact Form Step Navigation
    const formSteps = document.querySelectorAll('.form-step');
    const prevBtnForm = document.querySelector('.prev-btn');
    const nextBtnForm = document.querySelector('.next-btn');
    const stepDots = document.querySelectorAll('.step-dot');
    let currentStep = 0;

    function updateFormStep(step) {
        formSteps.forEach(s => s.classList.remove('active'));
        stepDots.forEach(d => d.classList.remove('active'));

        formSteps[step].classList.add('active');
        stepDots[step].classList.add('active');

        // Update button states
        prevBtnForm.disabled = step === 0;
        nextBtnForm.textContent = step === formSteps.length - 1 ? 'Submit' : 'Next';

        if (step === formSteps.length - 1) {
            nextBtnForm.innerHTML = 'Submit <i class="fas fa-paper-plane"></i>';
        }
    }

    if (prevBtnForm && nextBtnForm) {
        prevBtnForm.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                updateFormStep(currentStep);
            }
        });

        nextBtnForm.addEventListener('click', () => {
            if (currentStep < formSteps.length - 1) {
                currentStep++;
                updateFormStep(currentStep);
            } else {
                // Submit form
                const submitBtn = document.querySelector('.submit-btn-modern');
                const submitText = submitBtn.querySelector('.submit-text');
                const submitLoader = submitBtn.querySelector('.submit-loader');

                submitText.style.display = 'none';
                submitLoader.style.display = 'flex';

                setTimeout(() => {
                    submitText.style.display = 'inline';
                    submitLoader.style.display = 'none';
                    alert('Thank you for your inquiry! Our team will contact you within 24 hours.');
                    document.getElementById('contactFormModern').reset();
                    currentStep = 0;
                    updateFormStep(currentStep);
                }, 2000);
            }
        });
    }

    // Budget Range Value Display
    const budgetRange = document.getElementById('budget');
    const budgetValue = document.getElementById('budgetValue');

    if (budgetRange && budgetValue) {
        budgetRange.addEventListener('input', function () {
            const value = parseInt(this.value);
            budgetValue.textContent = `$${value.toLocaleString()}`;
        });
    }

    // Initialize form
    updateFormStep(0);
});

// Product Filter Functionality
document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productWrappers = document.querySelectorAll('.product-card-wrapper');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Filter products
            productWrappers.forEach(wrapper => {
                if (filterValue === 'all' || wrapper.getAttribute('data-category') === filterValue) {
                    wrapper.style.display = 'block';
                    setTimeout(() => {
                        wrapper.style.opacity = '1';
                        wrapper.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    wrapper.style.opacity = '0';
                    wrapper.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        wrapper.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Animate stats
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');

        statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-count'));
            const increment = target / 50;
            let current = 0;

            const updateStat = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = target % 1 === 0 ?
                        Math.floor(current) :
                        current.toFixed(1);
                    setTimeout(updateStat, 30);
                } else {
                    stat.textContent = target % 1 === 0 ?
                        target :
                        target.toFixed(1);
                }
            };

            // Trigger animation when stats are in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateStat();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(stat);
        });
    }

    // Initialize animations
    animateStats();

    // Product detail modal functionality
    const detailButtons = document.querySelectorAll('.product-details-btn');
    detailButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-product');
            // In a real implementation, this would open a modal with product details
            alert(`Showing detailed information for ${productId} product. In a real implementation, this would open a modal.`);
        });
    });

    // Add hover effect enhancement
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.product-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        card.addEventListener('mouseleave', function () {
            const icon = this.querySelector('.product-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
});