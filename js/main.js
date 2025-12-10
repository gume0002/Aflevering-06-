const cleave = new Cleave('#yearly-salary', {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter: '.',
    numeralDecimalMark: ','
});

// Swiper function
// =====================================================================
// 1. Initialiser Swiper-karrusellen
// =====================================================================
// Swiper styrer din billed/video-karrusel med coverflow-effekt.
// Her konfigurerer vi hvordan slideren skal opføre sig.
// =====================================================================

const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",

    // Coverflow-stil
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
    },

    // Pagination-prikker under slideren
    pagination: {
        el: ".swiper-pagination"
    },

    // Event der kører når et slide skifter
    on: {
        slideChange: function () {
            handleVideos(); // Stopper gamle videoer og starter den nye
        }
    }
});



// =====================================================================
// 2. Funktion der styrer afspilning af videoer
// =====================================================================
// Denne funktion finder alle videoer i slideren. Kun den aktive video
// må spille – alle andre pauses og nulstilles.
// =====================================================================

function handleVideos() {
    const videos = document.querySelectorAll(".slide-video");

    // Almindelig for-løkke i stedet for forEach med arrow function
    for (let i = 0; i < videos.length; i++) {
        if (i === swiper.activeIndex) {
            videos[i].play(); // Aktiv video spiller
        } else {
            videos[i].pause();         // Stop video
            videos[i].currentTime = 0; // Spol tilbage til start
        }
    }
}



// =====================================================================
// 3. AutoAdvance – skift slide automatisk hvert 17 sekund
// =====================================================================
// Denne funktion skifter til næste slide og kalder sig selv igen.
// Arrow function i setTimeout er fjernet og erstattet med function.
// =====================================================================

function autoAdvance() {
    setTimeout(function () {
        swiper.slideNext(); // Gå til næste slide
        autoAdvance();      // Kør funktionen igen → loop
    }, 17000);
}



// =====================================================================
// 4. Mute / unmute-knap
// =====================================================================
// Denne knap muter samtlige videoer i slideren og skifter ikon.
// Ingen arrow functions — alt er almindelige funktioner.
// =====================================================================

// -------------------------------------------------------------
// 1. Hent mute-knappen fra HTML'en
// -------------------------------------------------------------
const muteBtn = document.querySelector(".mute-button");
// Dette finder <button class="mute-button">🔉</button>


// -------------------------------------------------------------
// 2. Tilføj en klik-event på knappen
// Når knappen klikkes, kaldes funktionen toggleMute()
// -------------------------------------------------------------
muteBtn.addEventListener("click", toggleMute);


// -------------------------------------------------------------
// 3. Funktion der muter / unmuter alle videoer i karrusellen
// -------------------------------------------------------------
function toggleMute() {

    // Hent alle video-elementer i slideren
    const videos = document.querySelectorAll(".slide-video");

    // Variabel til at gemme nuværende mute-status
    // (vi antager at alle videoer har samme mute-state)
    let isMuted = false;

    // Hvis der findes mindst én video, tjek om den er mutet
    if (videos.length > 0) {
        isMuted = videos[0].muted;
    }

    // ---------------------------------------------------------
    // 4. Skift mute-status på alle videoer
    // Hvis de var mutede → unmute
    // Hvis de ikke var mutede → mute
    // ---------------------------------------------------------
    for (let i = 0; i < videos.length; i++) {
        videos[i].muted = !isMuted;
    }

    // ---------------------------------------------------------
    // 5. Opdater ikon på knappen så brugeren kan se status
    // 🔉  = lyd slået til
    // 🔇  = lyd slået fra
    // ---------------------------------------------------------
    if (isMuted) {
        muteBtn.textContent = "🔉";  // Lyd TIL
    } else {
        muteBtn.textContent = "🔇";  // Lyd FRA
    }
}



// =====================================================================
// 5. Startfunktioner ved første load
// =====================================================================

// Start styring af videoer (aktiver den første video)
handleVideos();

// Start automatisk slide-skift
autoAdvance();

// =====================================================================
// Start video kun når dens slide er synlig i viewport
// =====================================================================

// 6. Lav observeren
const videoObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        const video = entry.target;

        if (entry.isIntersecting) {
            // Kun start videoen hvis det også er den aktive slide
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
    threshold: 0.5 // 50% synlig før den må starte
});

// 7. Tilføj observer til alle videoer
const allVideos = document.querySelectorAll(".slide-video");
allVideos.forEach(function (video, index) {
    video.setAttribute("data-index", index);
    videoObserver.observe(video);
});

// -------------------------------------------------------------
// 1. Tilføj en klik-event på knappen
// Når knappen klikkes, kaldes funktionen toggleMute()
// -------------------------------------------------------------
muteBtn.addEventListener("click", toggleMute);


// -------------------------------------------------------------
// 2. Funktion der muter / unmuter alle videoer i karrusellen
// -------------------------------------------------------------
function toggleMute() {

    // Hent alle video-elementer i slideren
    const videos = document.querySelectorAll(".slide-video");

    // Variabel til at gemme nuværende mute-status
    // (vi antager at alle videoer har samme mute-state)
    let isMuted = false;

    // Hvis der findes mindst én video, tjek om den er mutet
    if (videos.length > 0) {
        isMuted = videos[0].muted;
    }

    // ---------------------------------------------------------
    // 3. Skift mute-status på alle videoer
    // Hvis de var mutede → unmute
    // Hvis de ikke var mutede → mute
    // ---------------------------------------------------------
    for (let i = 0; i < videos.length; i++) {
        videos[i].muted = !isMuted;
    }

    // ---------------------------------------------------------
    // 4. Opdater ikon på knappen så brugeren kan se status
    // 🔉  = lyd slået til
    // 🔇  = lyd slået fra
    // ---------------------------------------------------------
    if (isMuted) {
        muteBtn.textContent = "🔉";  // Lyd TIL
    } else {
        muteBtn.textContent = "🔇";  // Lyd FRA
    }
}

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

// Lukker sidepanelets kryds X
closePanel.addEventListener("click", function() {
    panel.classList.remove("active");
    overlay.classList.remove("active");
});

// Luk ved klik på siden
overlay.addEventListener("click", function() {
    panel.classList.remove("active");
    overlay.classList.remove("active");
});