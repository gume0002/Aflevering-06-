

// Swiper function


let swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },

    on: {
        slideChange: function () {
            handleVideos();
        }
    }
});

function handleVideos() {
    const videos = document.querySelectorAll('.slide-video');

    videos.forEach((video, index) => {
        if (index === swiper.activeIndex) {
            video.play();
        } else {
            video.pause();
            video.currentTime = 0;
        }
    });
}

function autoAdvance() {
    setTimeout(() => {
        swiper.slideNext();
        autoAdvance();
    }, 17000);
}

// Start ved load
handleVideos();
autoAdvance();




