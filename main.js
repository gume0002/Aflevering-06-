var swiper = new Swiper(".mySwiper", {
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
});

const ctx = document.querySelector('#chart').getContext('2d');

const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Eksempel data',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'red', 'blue', 'yellow', 'green', 'purple', 'orange'
            ]
        }]
    }
});
