import { updateScheduleCommon } from './schedule-detail.js?20230912';

function yearMonthFilterCallback(year, month) {
    return (eventDate) => {
        return eventDate.getFullYear() === year && (eventDate.getMonth() + 1) === month;
    };
}

export function updateSchedule(year, month) {
    updateScheduleCommon('schedule', yearMonthFilterCallback(year, month));
}
