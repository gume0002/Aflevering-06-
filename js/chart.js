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

    // increase salary by 2% annually
    for (let i = 0; i < labels.length; i++) {
        userSalaryArray.push(Math.round(newValue))
        newValue = newValue * 1.02


    }
    //const userSalaryArray = new Array(labels.length).fill(userValue);
    console.log(userSalaryArray)
    // destroy first chart and print new chart with user salary
    myChart.destroy()
    return renderChart(labels, values, userSalaryArray)
});


// Render chart
const ctx = document.querySelector('#chart').getContext('2d');

function renderChart(labels, values, userValues) {
    // Create gradients for a sleek modern look
    let gradientIT = ctx.createLinearGradient(0, 0, 0, 400);
    gradientIT.addColorStop(0, 'rgba(128, 52, 128, 0.4)');
    gradientIT.addColorStop(1, 'rgba(128, 52, 128, 0)');

    let gradientUser = ctx.createLinearGradient(0, 0, 0, 400);
    gradientUser.addColorStop(0, 'rgba(73, 73, 73, 0.4)');
    gradientUser.addColorStop(1, 'rgba(73, 73, 73, 0)');

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'IT ',
                    data: values,
                    backgroundColor: gradientIT,
                    borderColor: '#803480',
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Din nuværende indkomst',
                    data: userValues,
                    backgroundColor: gradientUser,
                    borderColor: '#494949',
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    fill: true,
                    tension: 0.4
                }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                y: {
                    duration: 1500,
                    from: 500,
                    easing: 'easeInOutCubic'
                }
            },
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        boxWidth: 8,
                        font: {
                            family: "'Inter', sans-serif"
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'År (Tidslinje)',
                    position: 'bottom',
                    align: 'center',
                    font: {
                        size: 14,
                        weight: 'normal',
                        family: "'Inter', sans-serif"
                    },
                    padding: {
                        top: 20
                    },
                    color: '#888'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleFont: { family: "'Inter', sans-serif" },
                    bodyFont: { family: "'Inter', sans-serif" }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            scales: {
                y: {
                    border: {
                        display: false
                    },
                    beginAtZero: true,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.03)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#aaa',
                        font: {
                            family: "'Inter', sans-serif"
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        display: false
                    }
                }
            }
        }
    });
}

