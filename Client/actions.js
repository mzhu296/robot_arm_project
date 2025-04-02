function changeTab(tabNumber) {
    // Hide all content divs
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));

    // Show the content for the selected tab
    document.getElementById('content-' + tabNumber).classList.add('active');

    // Set the selected button to active
    buttons[tabNumber - 1].classList.add('active');
    
    // Reset the motor tab view when switching tabs
    if (tabNumber !== 1) {
        resetMotorTabs();
    }
}

// Set default tab to 1 when the page loads
window.onload = function() {
    changeTab(1);
}

// Motor configuration sidebar logic
function changeMotorTab(motorNumber) {
    // Hide all motor content
    const motorContents = document.querySelectorAll('.motor-content');
    motorContents.forEach(content => content.classList.remove('active'));

    // Show the content for the selected motor
    document.getElementById('motor-' + motorNumber).classList.add('active');
}

function resetMotorTabs() {
    const motorContents = document.querySelectorAll('.motor-content');
    motorContents.forEach(content => content.classList.remove('active'));
}

// Toggle the visibility of the Brake Resistance input field
function toggleBrakeResistance() {
    const checkbox = document.getElementById('apply-brake-resistance');
    const brakeResistanceContainer = document.getElementById('brake-resistance-container');
    
    // Show or hide the Brake Resistance input based on the checkbox state
    if (checkbox.checked) {
        brakeResistanceContainer.style.display = 'block';
    } else {
        brakeResistanceContainer.style.display = 'none';
    }
}

// Toggle the visibility of the timer input field
function toggleTimer() {
    const checkbox = document.getElementById('apply-timer-value');
    const timerContainer = document.getElementById('timer-container');
    
    // Show or hide the Brake Resistance input based on the checkbox state
    if (checkbox.checked) {
        timerContainer.style.display = 'block';
    } else {
        timerContainer.style.display = 'none';
    }
}

// Function to create a grid for each axis (X, Y, Z)
function createGrid(gridId) {
    const gridContainer = document.getElementById(gridId);
    const rows = 5;
    const cols = 5;

    // Variable to keep track of the most recently clicked square
    let lastClickedSquare = null;

    // Create the grid cells dynamically
    for (let i = 0; i < rows * cols; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        // Add a click event to toggle the active state
        gridItem.addEventListener('click', () => {
            // If there was a previously clicked square, remove its highlight
            if (lastClickedSquare) {
                lastClickedSquare.classList.remove('active');
            }

            // Highlight the newly clicked square
            gridItem.classList.add('active');
            
            // Update the last clicked square reference
            lastClickedSquare = gridItem;
        });

        // Check if it's the center of the grid (index 12 in a 5x5 grid)
        if (i === 12) {
            gridItem.classList.add('current-position');
            gridItem.innerHTML = 'Current Position'; // Add label to center
        }

        gridContainer.appendChild(gridItem);
    }
}

// Initialize the grids on page load
document.addEventListener('DOMContentLoaded', () => {
    createGrid('x-axis-grid');
    createGrid('y-axis-grid');
    createGrid('z-axis-grid');
});

function showCustomizeButton1(selectedMotor) {
    const customizeButtonContainer = document.getElementById('customize-button-container1');
    const customizeButton = document.getElementById('customize-button1');

    // Show the Customize/Create button container
    customizeButtonContainer.style.display = 'block';

    // Change the button text based on selection
    if (selectedMotor === 'other') {
        customizeButton.innerHTML = 'Create Other Motor'; // If "Other" is selected, show "Create Other"
    } else {
        customizeButton.innerHTML = `Customize ${selectedMotor}`; // If a motor is selected, show "Customize"
    }
}

function showCustomizeButton2(selectedEncoder) {
    const customizeButtonContainer = document.getElementById('customize-button-container2');
    const customizeButton = document.getElementById('customize-button2');

    // Show the Customize/Create button container
    customizeButtonContainer.style.display = 'block';

    // Change the button text based on selection
    if (selectedEncoder === 'other') {
        customizeButton.innerHTML = 'Create Other Encoder'; // If "Other" is selected, show "Create Other"
    } else {
        customizeButton.innerHTML = `Customize ${selectedEncoder}`; // If a motor is selected, show "Customize"
    }
}


function customizeMotor() {
    // This function can be expanded to perform actions when the customize button is clicked
    alert('You can now customize your motor!');
}