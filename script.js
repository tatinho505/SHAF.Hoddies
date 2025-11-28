let currentSlide = 0;
let autoplayInterval = null;
const AUTOPLAY_DELAY = 4000; // ms

// Carrusel automático y manual
const images = document.querySelectorAll('.carousel-img');
const totalSlides = images.length;
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let carouselInterval;

function showSlide(index) {
    images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
    currentSlide = index;
}

function nextSlide() {
    let next = (currentSlide + 1) % totalSlides;
    showSlide(next);
}

function prevSlide() {
    let prev = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prev);
}

function startCarousel() {
    carouselInterval = setInterval(nextSlide, 3000);
}

function stopCarousel() {
    clearInterval(carouselInterval);
}

// Inicialización: añadir listeners a botones y comportamiento de autoplay/pausa
function initCarousel() {
    if (prevBtn) prevBtn.addEventListener('click', () => { stopCarousel(); prevSlide(); startCarousel(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { stopCarousel(); nextSlide(); startCarousel(); });

    // Navegación por teclado
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Asegurar que el carrusel se reajusta al cambiar el tamaño de la ventana
    window.addEventListener('resize', () => showSlide(currentSlide));

    // Mostrar primera imagen y arrancar autoplay
    showSlide(currentSlide);
    startCarousel();
}

// Ejecutar inicialización cuando el DOM ya cargó
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
} else {
    initCarousel();
}
