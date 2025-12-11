const cleave = new Cleave('#yearly-salary', {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter: '.',
    numeralDecimalMark: ','
});

// Karrusel

// Fået hjælp/inspiration af denne video -> https://www.youtube.com/watch?v=hdO3l6Ed8-c&t=312s
// Swiper styrer vores video karrusel med en coverflow effekt
const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",

    // Coverflow-stil -> Måden vores karrusel kører på.
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
    },

// Til denne del har vi fået hjælp af ChatGPT
// Funktion som gør at når karrusellen kører stopper videoerne omkring den
    on: {
        slideChange: function () {
            handleVideos();
        }
    }
});

// Til denne del har vi fået hjælp af ChatGPT
// Denne funktion sørger for at det kun er den aktive video som afspilles.
// Når karrusellen står på den aktive video stopper de andre videoer omkring og nulstilles / starter forfra.

function handleVideos() {
    const videos = document.querySelectorAll(".slide-video");


    for (let i = 0; i < videos.length; i++) {
        if (i === swiper.activeIndex) {
            videos[i].play();
        } else {
            videos[i].pause();
            videos[i].currentTime = 0;
        }
    }
}

// Denne funktion har vi fået guiding af af ChatGPT.
// Vi sørger for ved denne funktion at videoen skifter slide når der er gået 17 sekunder.
// Vores videoer er 17 sekunder lange. Derfor givet dette tids interval

function autoAdvance() {
    setTimeout(function () {
        swiper.slideNext();
        autoAdvance();
    }, 17100);
}


// MUTE KNAP

// Næste del har vi fået hjælp af ChatGPT -> Her laver vi en mute knap
// Her skal vi kunne slå lyd til og fra videoen ved hjælp af denne knap.

const muteBtn = document.querySelector(".mute-button");


// Bruger EventListerne -> Når knappen klikkes kaldes funktionen toggleMute
muteBtn.addEventListener("click", toggleMute);


function toggleMute() {

    const videos = document.querySelectorAll(".slide-video");

    let isMuted = false;

    if (videos.length > 0) {
        isMuted = videos[0].muted;
    }
// I denne del skifter vi "mute status" på videoerne.
// Hvis videoerne er mutede bliver de unmutede og omvendt
    for (let i = 0; i < videos.length; i++) {
        videos[i].muted = !isMuted;
    }

    // Her skifter vi ikonet alt efter om videoen er Mute eller unmute
    if (isMuted) {
        muteBtn.textContent = "🔉";  // Lyd TIL
    } else {
        muteBtn.textContent = "🔇";  // Lyd FRA
    }
}



// Næste del har vi fået guiding af ChatGPT
// Start karrusel når den er synlig


// Start styring af videoer (aktiver den første video)
handleVideos();

// Start automatisk slide-skift
autoAdvance();

// Starter videoen i karrusellen når den er synlig på hjemmesiden


const videoObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        const video = entry.target;

        if (entry.isIntersecting) {

            const slideIndex = parseInt(video.getAttribute("data-index"));

            if (slideIndex === swiper.activeIndex) {
                video.play();
            }
        } else {
            video.pause();
            video.currentTime = 0;
        }
    });
}, {
    threshold: 0.5
});


const allVideos = document.querySelectorAll(".slide-video");
allVideos.forEach(function (video, index) {
    video.setAttribute("data-index", index);
    videoObserver.observe(video);
});





// Til næste del har vi fået guiding af ChatGPT
// Vi laver et side Panel med information om hvordan vores lønberegner fungerer
const openPanel = document.getElementById("open-panel");
const closePanel = document.getElementById("close-panel");
const panel = document.getElementById("sidepanel");
const overlay = document.getElementById("overlay");

// Åbn sidepanel
openPanel.addEventListener("click", function(event) {
    event.preventDefault();
    panel.classList.add("active");
    overlay.classList.add("active");
});

// Lukker sidepanelets kryds med X
closePanel.addEventListener("click", function() {
    panel.classList.remove("active");
    overlay.classList.remove("active");
});

// Luk ved klik på siden
overlay.addEventListener("click", function() {
    panel.classList.remove("active");
    overlay.classList.remove("active");
});