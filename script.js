const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.card');
const imageTriggers = document.querySelectorAll('.image-trigger');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameFeedback = document.getElementById('name-feedback');
const emailFeedback = document.getElementById('email-feedback');
const messageFeedback = document.getElementById('message-feedback');
const formStatus = document.getElementById('form-status');

function toggleMenu() {
    const isOpen = siteNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
}

function smoothScroll(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

function filterProjects(category) {
    projectCards.forEach((card) => {
        const matches = category === 'all' || card.dataset.category === category;
        card.classList.toggle('is-hidden', !matches);
    });
}

function openLightbox(imageSrc, caption) {
    lightboxImage.src = imageSrc;
    lightboxImage.alt = caption;
    lightboxCaption.textContent = caption;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
}

function validateField(input, feedbackElement, message) {
    if (input.value.trim() === '') {
        input.classList.add('error');
        feedbackElement.textContent = message;
        return false;
    }

    input.classList.remove('error');
    feedbackElement.textContent = '';
    return true;
}

function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        emailInput.classList.add('error');
        emailFeedback.textContent = 'Please enter a valid email address.';
        return false;
    }

    emailInput.classList.remove('error');
    emailFeedback.textContent = '';
    return true;
}

if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', toggleMenu);
}

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            event.preventDefault();
            smoothScroll(targetId);
            if (window.innerWidth <= 768) {
                siteNav.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
});

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
        filterProjects(button.dataset.filter);
    });
});

imageTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
        openLightbox(trigger.dataset.full, trigger.dataset.caption);
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) {
        closeLightbox();
    }
});

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const isNameValid = validateField(nameInput, nameFeedback, 'Please enter your name.');
    const isEmailValid = validateEmail();
    const isMessageValid = validateField(messageInput, messageFeedback, 'Please enter a message.');

    if (isNameValid && isEmailValid && isMessageValid) {
        formStatus.textContent = 'Thank you! Your message has been sent.';
        contactForm.reset();
    } else {
        formStatus.textContent = 'Please fix the highlighted fields.';
    }
});

nameInput.addEventListener('input', () => validateField(nameInput, nameFeedback, 'Please enter your name.'));
emailInput.addEventListener('input', validateEmail);
messageInput.addEventListener('input', () => validateField(messageInput, messageFeedback, 'Please enter a message.'));
