let labels;
let values;
let userValue;
let myChart = null;


// Fetch function
// Function must be marked 'async' to use 'await'
async function fetchSalariesAsync() {
    try {
        // Pauses execution until the fetch promise resolves
        const response = await fetch('http://localhost:3001/api/salaries');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Pauses execution until the JSON parsing promise resolves
        const data = await response.json();

        // Example: extract labels and values for Chart.js
        labels = data.map(row => row.year);
        values = data.map(row => row.salary);

        console.log('Data from server:', data);
        // return data
        return renderChart(labels, values, null)

    } catch (error) {
        // Catches any error from the fetch, response.json(), or the HTTP check
        console.error('Error:', error);
    }
}

// call the fetch function
(async () => {
    try {
        await fetchSalariesAsync();
    } catch (e) {
        console.error("Fatal Error during script execution:", e);
    }
})();


// Get the input element
const saveButton = document.getElementById('submit-button');
const salaryInput = document.getElementById('yearly-salary');


saveButton.addEventListener('click', () => {
    let userSalaryArray = []
    userValue = parseFloat(salaryInput.value);
    let newValue = userValue

    if (isNaN(userValue) || userValue <= 0) {
        alert("Please enter a valid salary.");
        return;
    }

    for (let i = 0; i < labels.length; i++) {
        userSalaryArray.push(Math.round(newValue))
        newValue = newValue * 1.02


    }
    //const userSalaryArray = new Array(labels.length).fill(userValue);
    console.log(userSalaryArray)
    myChart.destroy()
    return renderChart(labels, values, userSalaryArray)
    //console.log(userValues)
});



const ctx = document.querySelector('#chart').getContext('2d');

function renderChart(labels, values, userValues) {
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                label: 'Eksempel data',
                data: values,
                backgroundColor: ['green']
            },
            {
                label: 'Eksempel data',
                data: userValues,
                backgroundColor: ['red']
            }]
    },
        options: {
                responsive: true, // This is true by default, but good to be explicit
                maintainAspectRatio: false, // Set to FALSE to force it to fill the height of the container
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
}


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