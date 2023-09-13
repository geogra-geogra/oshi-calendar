import { updateScheduleCommon } from './schedule-detail.js?20230912';

let today = new Date();
today.setHours(0, 0, 0, 0);
let mascotData;

// Fetch mascot data first
fetch("../data/mascot.json?20230912")
    .then(response => response.json())
    .then(data => {
        mascotData = data;
    });

    export function updateSchedule(year, month) {
        const startDate = new Date(year, month - 1, 1);
        startDate.setHours(0, 0, 0, 0);
    
        const endDate = new Date(year, month % 12 === 0 ? year + 1 : year, month % 12 === 0 ? 0 : month, 0);
        endDate.setHours(23, 59, 59, 999);
    
        const mascotFilterCallbackWithDate = function(eventDate, event) {
            const characters = event.character.split('/');
            const item = mascotData.find(mascot => mascot.name === filename);
    
            return item 
                   && characters.some(character => character.trim() === item.search) 
                   && eventDate >= startDate 
                   && eventDate <= endDate 
                   && eventDate >= today;
        };

    updateScheduleCommon('mascot-schedule', mascotFilterCallbackWithDate);
}

