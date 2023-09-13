import { updateSchedule } from './mascot-schedule.js';

let date = new Date();
let currentMonth = date.getMonth() + 1; // JavaScript months are 0-11
let currentYear = date.getFullYear();

const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
const calendarArea = document.getElementById('calendar-area');

function createCalendarElement() {
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

// 年月を逆にして表示
currentMonthYear.textContent = `${monthNames[currentMonth - 1]} ${currentYear}`;

// Function to update the calendar
function updateCalendar(month, year) {
    return new Promise((resolve) => {
        // Clear previous calendar
        calendar.innerHTML = '';

        // New calendar array
        const newCalendar = [];
        const daysInMonth = new Date(year, month, 0).getDate();

        // Find out the day of the week for the 1st of the month
        const firstDay = new Date(year, month - 1, 1).getDay();
        // Adjust firstDay to make Monday the first day of the week
        const adjustedFirstDay = (firstDay + 6) % 7;

        // Fill in empty days at the start of the month
        for (let i = 0; i < adjustedFirstDay; i++) {
            newCalendar.push('<td></td>');
        }

        // Populate calendar array
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month - 1, day);
            const id = `${year}${("0" + month).slice(-2)}${("0" + day).slice(-2)}`;
            const isToday = new Date().toDateString() === date.toDateString() ? ' today' : '';
            // アンカーをスケジュールIDに向けて変更
            newCalendar.push(`<td class="day${isToday}" id="${id}"><a href="#schedule-${id}" style="display: block; height: 100%;">${day}</a></td>
            `);
        }

        // Create calendar rows
        let calendarHTML = "<tr>"; // 曜日を追加
        const daysOfWeek = ["月", "火", "水", "木", "金", "土", "日"];
        for (let i = 0; i < daysOfWeek.length; i++) {
            calendarHTML += `<th>${daysOfWeek[i]}</th>`;
        }
        calendarHTML += "</tr><tr>";

        for (let i = 0; i < newCalendar.length; i++) {
            calendarHTML += newCalendar[i];
            if ((i + 1) % 7 == 0) { // new row every seven days
                calendarHTML += "</tr><tr>";
            }
        }
        calendarHTML += "</tr>";

        // Append to the DOM
        calendar.innerHTML = calendarHTML;
        resolve();
    });
}

// Initial calendar and fetch events
updateCalendar(currentMonth, currentYear).then(() => updateSchedule(currentYear, currentMonth));

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
    updateCalendar(currentMonth, currentYear).then(() => updateSchedule(currentYear, currentMonth));
    currentMonthYear.textContent = `${monthNames[currentMonth - 1]} ${currentYear}`;
    checkPrevButton(); // Check if the button should be hidden
});

document.getElementById('nextMonth').addEventListener('click', () => {
    if (++currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
    }
    updateCalendar(currentMonth, currentYear).then(() => updateSchedule(currentYear, currentMonth));
    currentMonthYear.textContent = `${monthNames[currentMonth - 1]} ${currentYear}`;
    checkPrevButton(); // Check if the button should be hidden
});

// Initial check for the prevMonth button
checkPrevButton();