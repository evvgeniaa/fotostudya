let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let autoSlide = setInterval(nextSlide, 3000); 

function updateSlider() {
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
}


document.querySelector('.slider-container').addEventListener('mouseover', () => {
    clearInterval(autoSlide);
});


document.querySelector('.slider-container').addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 3000);
});
