const slides = document.querySelectorAll(".slider img");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const imgId = document.querySelector(".img-id");
const galleryContainer = document.querySelector(".gallery-container");

galleryContainer.style.gridTemplateColumns = `repeat(${slides.length}, 1fr)`;

let currentSlide = 0;
let autoPlayInterval;
let autoPlayTimeout;

updateSliderControls();

function goToSlide(n) {
  // Remove Active Class from the Current Slide
  slides[currentSlide].classList.remove("active");
  // Update the Current Slide
  currentSlide = (n + slides.length) % slides.length; // (-1 + 7) % 7
  // Add Active Class to the New Slide
  slides[currentSlide].classList.add("active");
  // Update Slider Controls
  updateSliderControls();
  // Update Thumbnail Active State
  updateThumbnailActiveState(currentSlide);
}

prevBtn.addEventListener("click", () => {
  goToSlide(currentSlide - 1); // -1
  resetAutoPlay();
});

nextBtn.addEventListener("click", () => {
  goToSlide(currentSlide + 1);
  resetAutoPlay();
});

function updateSliderControls() {
  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === slides.length - 1; // 6
  imgId.innerHTML = `Image ${currentSlide + 1} of ${slides.length}`;
}

slides.forEach((img, index) => {
  const thumbnail = img.cloneNode();
  thumbnail.addEventListener("click", () => {
    goToSlide(index);
    resetAutoPlay();
  });
  galleryContainer.appendChild(thumbnail);
});

function updateThumbnailActiveState(index) {
  galleryContainer.querySelectorAll("img").forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
}

/**
 * Automatically advances to the next slide every 2 seconds.
 * Uses setInterval to repeatedly call the goToSlide function,
 * incrementing the current slide index by 1 each time.
 */
function autoPlay() {
  autoPlayInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 2000);
}

function resetAutoPlay() {
  clearInterval(autoPlayInterval);
  clearTimeout(autoPlayTimeout);
  autoPlayTimeout = setTimeout(() => {
    autoPlay();
  }, 5000); // Resume autoplay after 5 seconds of inactivity
}

autoPlay();
