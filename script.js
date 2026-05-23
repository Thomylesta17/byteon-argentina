/* =============================================
   BYTEON ARGENTINA — script.js
   - Navbar hamburger
   - Scroll navbar effect
   - Language switcher (ES / EN)
   ============================================= */

/* ---- HAMBURGER ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Cerrar al hacer click en un link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* ---- NAVBAR SCROLL SHADOW ---- */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });
}

/* ---- LANGUAGE SWITCHER ---- */
let currentLang = localStorage.getItem('byteon-lang') || 'es';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('byteon-lang', lang);
  applyLang();
  updateLangButtons();
}

function applyLang() {
  document.querySelectorAll('[data-es]').forEach(el => {
    const text = currentLang === 'en' ? el.dataset.en : el.dataset.es;
    if (text !== undefined) {
      // Si el elemento tiene innerHTML con tags (ej: <br/>), usamos innerHTML
      if (text.includes('<')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    }
  });
  document.documentElement.lang = currentLang;
}

function updateLangButtons() {
  const btnEs = document.getElementById('btnEs');
  const btnEn = document.getElementById('btnEn');
  if (!btnEs || !btnEn) return;
  if (currentLang === 'es') {
    btnEs.classList.add('active');
    btnEn.classList.remove('active');
  } else {
    btnEn.classList.add('active');
    btnEs.classList.remove('active');
  }
}

// Inicializar idioma al cargar
document.addEventListener('DOMContentLoaded', () => {
  applyLang();
  updateLangButtons();
});

/* ---- SCROLL REVEAL (Intersection Observer) ---- */
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  // Elementos a revelar al hacer scroll
  const revealEls = document.querySelectorAll(
    '.project-card, .stat-box, .about-left, .about-stats'
  );
  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`;
    observer.observe(el);
  });
});