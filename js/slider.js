document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    if (!slider) return;

    const slides = Array.from(slider.getElementsByTagName('img'));
    if (slides.length === 0) return;

    let currentSlide = 0;
    let isAnimating = false;

    // Crear contenedor de puntos
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
    
    // Crear puntos para cada slide
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'slider-dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    slider.appendChild(dotsContainer);

    // Función para cambiar de slide
    function goToSlide(index) {
        if (isAnimating || index === currentSlide) return;
        isAnimating = true;

        // Remover clase active del slide actual
        slides[currentSlide].classList.remove('active');
        dotsContainer.children[currentSlide].classList.remove('active');

        // Activar nuevo slide
        slides[index].classList.add('active');
        dotsContainer.children[index].classList.add('active');

        currentSlide = index;

        // Permitir nueva animación después de la transición
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    // Función para ir al siguiente slide
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    // Autoplay
    let interval = setInterval(nextSlide, 5000);

    // Pausar autoplay al hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });

    // Reanudar autoplay al quitar hover
    slider.addEventListener('mouseleave', () => {
        interval = setInterval(nextSlide, 5000);
    });

    // Asegurarse de que el primer slide esté visible
    slides[0].classList.add('active');
}); 