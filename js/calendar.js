export let date = new Date();
export let currentMonth = date.getMonth() + 1; // JavaScript months are 0-11
export let currentYear = date.getFullYear();

export const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
export const calendarArea = document.getElementById('calendar-area');

export function createCalendarElement() {
    const calendarNavigation = document.createElement('div');
    const prevMonthButton = document.createElement('button');
    const currentMonthYearDiv = document.createElement('div');
    const nextMonthButton = document.createElement('button');
    const calendarTable = document.createElement('table');

    calendarNavigation.id = 'calendar-navigation';
    prevMonthButton.id = 'prevMonth';
    currentMonthYearDiv.id = 'currentMonthYear';
    nextMonthButton.id = 'nextMonth';
    calendarTable.id = 'calendar';

    prevMonthButton.textContent = '前の月';
    nextMonthButton.textContent = '次の月';

    calendarNavigation.appendChild(prevMonthButton);
    calendarNavigation.appendChild(currentMonthYearDiv);
    calendarNavigation.appendChild(nextMonthButton);
    calendarArea.appendChild(calendarNavigation);
    calendarArea.appendChild(calendarTable);
}

createCalendarElement();

const calendar = document.getElementById('calendar');
const currentMonthYear = document.getElementById('currentMonthYear');
currentMonthYear.textContent = `${monthNames[currentMonth - 1]} ${currentYear}`;

// Function to update the calendar
export function updateCalendar(month, year) {
    return new Promise((resolve) => {
        // Clear previous calendar
        calendar.innerHTML = '';

        // ... [The rest of the updateCalendar function logic]

        // Append to the DOM
        calendar.innerHTML = calendarHTML;
        resolve();
    }).then(() => updateScheduleFunc(currentYear, currentMonth));
}

// Function to control the visibility of prevMonth button
function checkPrevButton() {
    const now = new Date();
    const nowMonth = now.getMonth() + 1;
    const nowYear = now.getFullYear();

    // If the current calendar month is not in the future
    if (currentYear < nowYear || (currentYear === nowYear && currentMonth <= nowMonth)) {
        document.getElementById('prevMonth').style.display = 'none';
    } else {
        document.getElementById('prevMonth').style.display = 'block';
    }
}

// Event listeners for buttons
document.getElementById('prevMonth').addEventListener('click', () => {
    if (--currentMonth < 1) {
        currentMonth = 12;
        currentYear--;
    }
    updateCalendar(currentMonth, currentYear, updateSchedule);
    currentMonthYear.textContent = `${monthNames[currentMonth - 1]} ${currentYear}`;
    checkPrevButton(); // Check if the button should be hidden
});
