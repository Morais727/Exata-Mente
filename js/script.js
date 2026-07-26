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
