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




