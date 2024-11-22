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