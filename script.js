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

const whatsappIcon = '<svg class="contact-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.3 11.8a8.3 8.3 0 0 1-12.4 7.2L3 20l1-4.8a8.3 8.3 0 1 1 16.3-3.4Z"/><path d="M8.4 7.8c-.6.1-1 .9-.9 1.6.1 2 3.7 5.6 5.8 5.8.7.1 1.5-.3 1.6-.9l.2-.8-1.9-.9-.8 1c-1.3-.6-2.2-1.6-2.8-2.8l1- .8-.9-1.9Z"/></svg>';
const phoneIcon = '<svg class="contact-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6.1 3.8 9 3l2.1 4.5-2 1.7a16 16 0 0 0 5.7 5.7l1.7-2L21 15l-.8 2.9c-.4 1.5-1.8 2.4-3.3 2.2C9.5 19 5 14.5 3.9 7.1c-.2-1.5.7-2.9 2.2-3.3Z"/></svg>';
document.querySelectorAll('.wa-link').forEach(link => link.insertAdjacentHTML('afterbegin', whatsappIcon));
document.querySelectorAll('a[href^="tel:"]').forEach(link => link.insertAdjacentHTML('afterbegin', phoneIcon));

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
