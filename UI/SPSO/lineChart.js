// Select the canvas
const ctx = document.getElementById('lineChart').getContext('2d');

// Data for the chart
const data = {
    labels: [0, 10, 20, 30, 40, 50], // X-axis values
    datasets: [
        {
            label: 'Pages',
            data: [0, 0, 5, 15, 25, 45], // Y-axis data
            borderColor: '#ffd32c',
            backgroundColor: '#ffd32c',
            borderWidth: 2,
            fill: false,
            tension: 0.4, // Smooth curves
        },
        {
            label: 'Commands',
            data: [0, 10, 15, 20, 35, 40], // Y-axis data
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
            borderWidth: 2,
            fill: false,
            tension: 0.4, // Smooth curves
        },
    ],
};

// Chart configuration
const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false, // Disable automatic scaling to container
        plugins: {
            legend: {
                display: true,
                position: 'left',
                labels: {
                    usePointStyle: true,
                    font: {
                        size: 12,
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    color: '#ccc',
                },
            },
            y: {
                min: 0,
                max: 50,
                ticks: {
                    stepSize: 10,
                },
                grid: {
                    color: '#ccc',
                },
            },
        },
    },
};

// Create the chart
const lineChart = new Chart(ctx, config);