// Update CONTACT_NUMBER if the clinic's WhatsApp number changes.
const CONTACT_NUMBER = '584228003270';
const isEnglish = document.documentElement.lang === 'en';
document.querySelectorAll('.wa-link').forEach(link => {
  const message = link.dataset.message || (isEnglish ? 'Hello, I would like information about San Antonio Surgical Center.' : 'Hola, quisiera información sobre el Centro Quirúrgico San Antonio.');
  link.href = `https://wa.me/${CONTACT_NUMBER}?text=${encodeURIComponent(message)}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});
document.getElementById('year').textContent = new Date().getFullYear();
const toggle = document.querySelector('.menu-toggle');
const menu = document.getElementById('nav-menu');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? (isEnglish ? 'Close menu' : 'Cerrar menú') : (isEnglish ? 'Open menu' : 'Abrir menú'));
  menu.classList.toggle('open', open);
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', isEnglish ? 'Open menu' : 'Abrir menú');
}));

const whatsappIcon = '<svg class="contact-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.3 11.8a8.3 8.3 0 0 1-12.4 7.2L3 20l1-4.8a8.3 8.3 0 1 1 16.3-3.4Z"/><path d="M8.2 8.1c-.5.5-.5 1.4 0 2.4 1.1 2.3 3.1 4.3 5.4 5.4 1 .5 1.9.5 2.4 0l.5-.8-2.5-1.3-.8.9a7.4 7.4 0 0 1-3.9-3.9l.9-.8-1.3-2.5Z"/></svg>';
const phoneIcon = '<svg class="contact-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6.1 3.8 9 3l2.1 4.5-2 1.7a16 16 0 0 0 5.7 5.7l1.7-2L21 15l-.8 2.9c-.4 1.5-1.8 2.4-3.3 2.2C9.5 19 5 14.5 3.9 7.1c-.2-1.5.7-2.9 2.2-3.3Z"/></svg>';
const instagramIcon = '<svg class="contact-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';
const mapIcon = '<svg class="contact-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.6"/></svg>';
const mailIcon = '<svg class="contact-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/></svg>';
document.querySelectorAll('.wa-link').forEach(link => link.insertAdjacentHTML('afterbegin', whatsappIcon));
document.querySelectorAll('a[href^="tel:"]').forEach(link => link.insertAdjacentHTML('afterbegin', phoneIcon));
document.querySelectorAll('a[href*="instagram.com/"]').forEach(link => link.insertAdjacentHTML('afterbegin', instagramIcon));
document.querySelectorAll('a[href*="google.com/maps/"]').forEach(link => link.insertAdjacentHTML('afterbegin', mapIcon));
document.querySelectorAll('a[href^="mailto:"]').forEach(link => link.insertAdjacentHTML('afterbegin', mailIcon));

const heroMedia = document.querySelector('.hero-media');
const heroSlides = [...heroMedia.querySelectorAll('.hero-slide')];
let activeSlide = 0;
const showSlide = index => {
  activeSlide = (index + heroSlides.length) % heroSlides.length;
  heroSlides.forEach((slide, slideIndex) => {
    const active = slideIndex === activeSlide;
    slide.classList.toggle('is-active', active);
    if (active) slide.removeAttribute('aria-hidden');
    else slide.setAttribute('aria-hidden', 'true');
  });
  heroMedia.querySelector('.slide-count').textContent = `${String(activeSlide + 1).padStart(2, '0')} / ${String(heroSlides.length).padStart(2, '0')}`;
};
heroMedia.querySelector('.slide-prev').addEventListener('click', () => showSlide(activeSlide - 1));
heroMedia.querySelector('.slide-next').addEventListener('click', () => showSlide(activeSlide + 1));
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.setInterval(() => {
    if (!document.hidden && !heroMedia.matches(':hover') && !heroMedia.matches(':focus-within')) showSlide(activeSlide + 1);
  }, 6500);
}

const imageDialog = document.querySelector('.image-dialog');
const enlargedImage = imageDialog.querySelector('img');
document.querySelectorAll('.photo-zoom').forEach(button => button.addEventListener('click', () => {
  const thumbnail = button.querySelector('img');
  enlargedImage.src = thumbnail.currentSrc || thumbnail.src;
  enlargedImage.alt = thumbnail.alt;
  imageDialog.querySelector('p').textContent = button.closest('figure').querySelector('figcaption').textContent.trim();
  imageDialog.showModal();
}));
const closeImage = () => imageDialog.close();
imageDialog.querySelector('.image-dialog-close').addEventListener('click', closeImage);
imageDialog.addEventListener('click', event => { if (event.target === imageDialog) closeImage(); });
imageDialog.addEventListener('close', () => enlargedImage.removeAttribute('src'));
