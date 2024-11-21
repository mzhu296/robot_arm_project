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
}

// Set default tab to 1 when the page loads
window.onload = function() {
    changeTab(1);
} 