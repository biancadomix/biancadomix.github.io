/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?

/* booking.js */
// DOM elements
const dayButtons = document.querySelectorAll('.blue-hover');
const fullButton = document.getElementById('full');
const halfButton = document.getElementById('half');
const clearButton = document.getElementById('clear-button');
const calculatedCost = document.getElementById('calculated-cost');

// Variables
let dailyRate = 35; // Default full-day rate
let selectedDays = [];
let totalCost = 0;

// Event listeners
dayButtons.forEach(button => {
    button.addEventListener('click', toggleDay);
});


// Functions
function toggleDay(event) {
    const clickedDay = event.target;

    if (!clickedDay.classList.contains('clicked')) {
        clickedDay.classList.add('clicked');
        selectedDays.push(clickedDay.id);
    } else {
        clickedDay.classList.remove('clicked');
        const index = selectedDays.indexOf(clickedDay.id);
        if (index > -1) {
            selectedDays.splice(index, 1);
        }
    }

    calculateTotalCost();
}



/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!

function updateRateButtons(selectedButton, unselectedButton) {
    selectedButton.classList.add('clicked');
    unselectedButton.classList.remove('clicked');
}

/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.

function clearDays() {
    dayButtons.forEach(button => {
        button.classList.remove('clicked');
    });
    selectedDays = [];
    calculateTotalCost();
}


/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.

halfButton.addEventListener('click', () => {
    dailyRate = 20;
    updateRateButtons(halfButton, fullButton);
    calculateTotalCost();
});

clearButton.addEventListener('click', clearDays);

// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.

fullButton.addEventListener('click', () => {
    dailyRate = 35;
    updateRateButtons(fullButton, halfButton);
    calculateTotalCost();
});

/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value

function calculateTotalCost() {
    totalCost = dailyRate * selectedDays.length;
    calculatedCost.textContent = totalCost;
}
