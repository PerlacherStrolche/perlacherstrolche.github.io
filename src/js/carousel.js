/**
 * Image Carousel
 */
export function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) {
        return;
    }

    const carouselTrack = carousel.querySelector('.carousel-track');
    const slides = Array.from(carouselTrack.children);
    const dotsNav = carousel.querySelector('.carousel-nav');
    const dots = Array.from(dotsNav.children);

    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange slides next to each other
    slides.forEach((slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    });

    // Function to move to a specific slide
    const moveToSlide = (currentSlide, targetSlide) => {
        carouselTrack.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    // Update dots
    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    };

    // Dot navigation
    dotsNav.addEventListener('click', (e) => {
        const targetDot = e.target.closest('button');

        if (!targetDot) {
            return;
        }

        const currentSlide = carouselTrack.querySelector('.current-slide');
        const currentDot = dotsNav.querySelector('.current-slide');
        const targetIndex = dots.findIndex((dot) => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
    });

    // Auto-advance carousel
    let carouselInterval;

    function startCarousel() {
        carouselInterval = setInterval(() => {
            const currentSlide = carouselTrack.querySelector('.current-slide');
            let nextSlide = currentSlide.nextElementSibling;

            // If at the end, loop back to first slide
            if (!nextSlide) {
                nextSlide = slides[0];
            }

            const currentDot = dotsNav.querySelector('.current-slide');
            const nextIndex = slides.findIndex((slide) => slide === nextSlide);
            const nextDot = dots[nextIndex];

            moveToSlide(currentSlide, nextSlide);
            updateDots(currentDot, nextDot);
        }, 5000); // Change slide every 5 seconds
    }

    function stopCarousel() {
        clearInterval(carouselInterval);
    }

    // Start carousel automatically
    startCarousel();

    // Pause carousel on hover
    carousel.addEventListener('mouseenter', stopCarousel);
    carousel.addEventListener('mouseleave', startCarousel);
}
