
document.addEventListener('DOMContentLoaded', function() {
    // Carousels
    const carousels = document.querySelectorAll('.carousel-wrapper');
    const autoPlayDelay = 5000;

    carousels.forEach(carousel => {
        const container = carousel.querySelector('.carousel-container');
        const slides = container.querySelectorAll('.carousel-slide');
        const prevButton = container.querySelector('.carousel-button.prev');
        const nextButton = container.querySelector('.carousel-button.next');
        const dotsContainer = container.querySelector('.carousel-dots');
        
        const shouldAutoplay = !carousel.classList.contains('no-autoplay');
        let currentIndex = 0;
        let autoPlayInterval = null;
        const totalSlides = slides.length;

        if (totalSlides === 0) return;
        
        // Create dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        }

        const dots = dotsContainer.querySelectorAll('.dot');

        function updateCarousel() {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            if (slides[currentIndex]) {
                slides[currentIndex].classList.add('active');
            }
            if (dots[currentIndex]) {
                dots[currentIndex].classList.add('active');
            }
        }

        function goToSlide(slideIndex) {
            currentIndex = slideIndex;
            updateCarousel();
        }
        
        function startAutoPlay() {
            if (!shouldAutoplay) return;
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateCarousel();
            }, autoPlayDelay);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
            resetAutoPlay();
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
            resetAutoPlay();
        });
        
        if (shouldAutoplay) {
            container.addEventListener('mouseenter', stopAutoPlay);
            container.addEventListener('mouseleave', startAutoPlay);
        }

        updateCarousel();
        startAutoPlay();
    });

    // Update copyright year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
