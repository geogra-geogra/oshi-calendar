function getEvents(data, filterCallback) {
    return data.filter((item) => {
        const eventDate = new Date(item.date.split('/').join('-'));
        return filterCallback(eventDate, item);
    });
}

function createEventDetails(item, mascots) {
    const eventDetails = document.createElement('div');
    let title = item.title;
    let titleClass = ''; // Default to no class
    let hasSpecialEvent = false;  // Flag to indicate a special event

    const characters = item.character.split('/');
    let characterHTML = '';

    characters.forEach(character => {
        const mascotMatch = mascots.find(mascot => mascot.search === character.trim());
        characterHTML += mascotMatch ? `<a href="../profile/${mascotMatch.name}.html">${character}</a>/` : `${character}/`;
    });

    // Apply the final titleClass
    title = `<span class="${titleClass}">${title}</span>`;

    // Removing the last '/'
    characterHTML = characterHTML.slice(0, -1);

    eventDetails.innerHTML = `
    <h4>${title}</h4>
    ${characterHTML}<br>
    場所：${item.spot}
    ${item.lng && item.lat ? `<a href="https://www.google.co.jp/maps/?q=${item.lng},${item.lat}" target="_blank" rel="noopener noreferrer">(地図)</a>` : ''}
    <br>
    ${item.remarks ? `<span class="remarks">${item.remarks}</span><br>` : ''}
    ${item.url1 ? `<a href="${item.url1}" target="_blank" rel="noopener noreferrer">参考記事</a><br>` : ''}
    ${item.url2 ? `<a href="${item.url2}" target="_blank" rel="noopener noreferrer">参考記事2</a><br>` : ''}
    <br>
    `;

    return {
        element: eventDetails,
        isSpecial: hasSpecialEvent
    };
}



export function updateScheduleCommon(scheduleDivId, filterCallback) {
    const scheduleDiv = document.getElementById(scheduleDivId);

    fetch('../data/mascot.json?20230912')
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(mascots => {
            fetch(`../data/schedule.json?20230912`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("HTTP error " + response.status);
                    }
                    return response.json();
                })
                .then(json => {
                    scheduleDiv.innerHTML = ''; // clear previous schedule
                    let currentDate = null;
                    let events = getEvents(json, filterCallback);
                    if (events.length === 0) {
                        scheduleDiv.innerHTML = "予定はありません。";
                        return;
                    }
                    events.forEach((item) => {
                        const eventDate = new Date(item.date.split('/').join('-'));
                        let hasSpecialEvent = false;
                        if (currentDate !== item.date) {
                            currentDate = item.date;
                            const id = "schedule-" + eventDate.toISOString().split('T')[0].replace(/-/g, '');

                            const dateHeading = document.createElement('h3');

                            // Get the day of the week from the eventDate and convert it to Japanese
                            const daysOfWeekJP = ["日", "月", "火", "水", "木", "金", "土"];
                            const dayOfWeekIndex = eventDate.getDay();
                            const dayOfWeekJP = daysOfWeekJP[dayOfWeekIndex];

                            dateHeading.id = id;
                            dateHeading.textContent = currentDate + " (" + dayOfWeekJP + ")"; // Append the day of the week to the date
                            scheduleDiv.appendChild(dateHeading);
                        }

                        // Create the event details and update the special event flag
                        const eventDetailsData = createEventDetails(item, mascots);
                        hasSpecialEvent = eventDetailsData.isSpecial;
                        const eventDetails = eventDetailsData.element;

                        // Add appropriate class to the corresponding date in the calendar
                        const calendarDateId = eventDate.toISOString().split('T')[0].replace(/-/g, '');
                        const calendarDateElement = document.getElementById(calendarDateId);
                        if (calendarDateElement) {
                            calendarDateElement.classList.add(hasSpecialEvent ? "hasSpecialEvent" : "hasEvent");
                        }

                        scheduleDiv.appendChild(eventDetails);
                    });

                })
                .catch(function () {
                    console.log("Error loading JSON data.");
                });
        })
        .catch(function () {
            console.log("Error loading mascot JSON data.");
        });

}