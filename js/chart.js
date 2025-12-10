let labels;
let values;
let myChart = null;
let data;

const saveButton = document.getElementById('submit-button');
const salaryInput = document.getElementById('yearly-salary');


// Fetch function
async function fetchSalariesAsync() {
    try {
        // Pauses execution until the fetch promise resolves
        const response = await fetch('http://localhost:3001/api/salaries');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Pauses execution until the JSON parsing promise resolves
        data = await response.json();

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





// Calculate and display user salary
function handleCalculationExecution() {
    let userSalaryArray = []
    let cleanedValue = salaryInput.value.replace(/[^\d]/g, ''); // Remove all non-digit characters
    let userValue = parseFloat(cleanedValue);
    let newValue = userValue
    const itAVGLast = data[data.length-1].salary

    if (isNaN(userValue) || userValue <= 0) {
        alert("Please enter a valid salary.");
        return;
    }

    // increase salary by 2% annually
    for (let i = 0; i < labels.length; i++) {
        userSalaryArray.push(Math.round(newValue))
        newValue = newValue * 1.02
    }

    const userSalaryLast = userSalaryArray[userSalaryArray.length-1]

    // Ensure myChart exists before destroying
    if (myChart) {
        myChart.destroy()
    }

    compareDifference(itAVGLast, userSalaryLast)
    return renderChart(labels, values, userSalaryArray)
}


// Event listeners for user salary
saveButton.addEventListener('click', handleCalculationExecution);
salaryInput.addEventListener('keydown', function(event) {
    // Check if the pressed key is 'Enter'
    if (event.key === 'Enter') {
        //event.preventDefault(); // Stop default action

        // Execute the calculation logic
        handleCalculationExecution();
    }
});

// Compare salary difference and display it
function compareDifference(itAVG, userSalary) {
    // console.log(Math.trunc(itAVG - userSalary))
    const difference = Math.trunc(itAVG - userSalary)
    const element = document.querySelector('.salary-difference-p')
    const formatted = difference.toLocaleString('da-DK')

    element.textContent = `Du vil tjene ${formatted} kr. mindre om måneden i år 2050`
    document.querySelector(".salary-difference").style.display = "block";
}

// Render chart
const ctx = document.querySelector('#chart').getContext('2d');

function renderChart(labels, values, userValues) {
    // Create gradients for the fill (Background)
    let gradientIT = ctx.createLinearGradient(0, 0, 0, 400);
    gradientIT.addColorStop(0, 'rgba(128, 52, 128, 0.5)'); // Slightly more opaque at top
    gradientIT.addColorStop(1, 'rgba(128, 52, 128, 0.0)');

    let gradientUser = ctx.createLinearGradient(0, 0, 0, 400);
    gradientUser.addColorStop(0, 'rgba(73, 73, 73, 0.5)');
    gradientUser.addColorStop(1, 'rgba(73, 73, 73, 0.0)');

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'IT-gennemsnit ',
                    data: values,
                    backgroundColor: gradientIT,
                    borderColor: '#803480', // Reverted to solid color
                    borderWidth: 2, // Reverted to original width
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Nuværende indkomst',
                    data: userValues,
                    backgroundColor: gradientUser,
                    borderColor: '#494949', // Reverted to solid color
                    borderWidth: 2, // Reverted to original width
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
                    display: false
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

