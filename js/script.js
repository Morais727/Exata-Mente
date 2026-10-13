const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

const form = document.getElementById('contactForm');
const statusText = document.getElementById('form-status');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async function (event) {
  event.preventDefault();
  statusText.textContent = 'Enviando mensagem...';
  statusText.style.color = '#8b9bb8';
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (response.ok) {
      statusText.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
      statusText.style.color = '#10b981';
      form.reset();
    } else {
      statusText.textContent = 'Não foi possível enviar agora. Tente novamente em instantes.';
      statusText.style.color = '#f87171';
    }
  } catch {
    statusText.textContent = 'Erro de conexão. Verifique sua internet e tente novamente.';
    statusText.style.color = '#f87171';
  }

  submitBtn.disabled = false;
  submitBtn.textContent = 'Enviar mensagem';
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.project-thumb-img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

const carousel = document.querySelector('.projects-carousel');
const track = carousel.querySelector('.projects-track');
const prevBtn = carousel.querySelector('.carousel-prev');
const nextBtn = carousel.querySelector('.carousel-next');
const dotsWrap = document.querySelector('.carousel-dots');
const slides = track.querySelectorAll('.project-card');

function slideStep() {
  const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
  return slides[0].offsetWidth + gap;
}

function perView() {
  return Math.round((track.clientWidth + 1) / slideStep()) || 1;
}

function pageCount() {
  return Math.max(1, slides.length - perView() + 1);
}

function currentIndex() {
  return Math.round(track.scrollLeft / slideStep());
}

function goTo(index) {
  track.scrollTo({ left: index * slideStep() });
}

function renderDots() {
  dotsWrap.innerHTML = '';
  const count = pageCount();
  dotsWrap.hidden = count <= 1;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  }
  updateCarousel();
}

function updateCarousel() {
  const index = currentIndex();
  const maxScroll = track.scrollWidth - track.clientWidth;
  prevBtn.disabled = track.scrollLeft <= 2;
  nextBtn.disabled = track.scrollLeft >= maxScroll - 2;
  dotsWrap.querySelectorAll('button').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

prevBtn.addEventListener('click', () => goTo(currentIndex() - 1));
nextBtn.addEventListener('click', () => goTo(currentIndex() + 1));
track.addEventListener('scroll', updateCarousel, { passive: true });
track.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(currentIndex() - 1); }
  if (e.key === 'ArrowRight') { e.preventDefault(); goTo(currentIndex() + 1); }
});
window.addEventListener('resize', renderDots);
renderDots();
