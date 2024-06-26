/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 *
 * @param {string} date - date and time.
 * @return {number} milliseconds in timestamp.
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 0
 * '04 Dec 1995 00:12:00 UTC' => 818035920000
 */
function dateToTimestamp(date) {
  return new Date(date).getTime();
}

/**
 * Returns the time in hh:mm:ss format from the received date.
 *
 * @param {Date} date - date.
 * @return {string} time in hh:mm:ss format.
 *
 * @example:
 * Date(2023, 5, 1, 8, 20, 55) => '08:20:55'
 * Date(2015, 10, 20, 23, 15, 1) => '23:15:01'
 */
function getTime(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

/**
 * Returns the name of the day of the week for a given date string.
 *
 * @param {string} date - date and time.
 * @return {string} the name of the day of the week
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 'Thursday'
 * '03 Dec 1995 00:12:00 UTC' => 'Sunday'
 * '2024-01-30T00:00:00.000Z' => 'Tuesday'
 */
function getDayName(date) {
  const dayNumber = new Date(date).getDay();

  const dayNames = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };

  return dayNames[dayNumber];
}

/**
 * Returns the date of the next Friday from a given date.
 *
 * @param {Date} date
 * @return {Date}
 *
 * @example:
 * Date('2024-02-03T00:00:00Z') => Date('2024-02-09T00:00:00Z')
 * Date('2024-02-13T00:00:00Z') => Date('2024-02-16T00:00:00Z')
 * Date('2024-02-16T00:00:00Z') => Date('2024-02-23T00:00:00Z')
 */

// first way
// function getNextFriday(date) {
//   const newDate = new Date(date);
//   const currectDayNumber = {
//     0: 7,
//     1: 1,
//     2: 2,
//     3: 3,
//     4: 4,
//     5: 5,
//     6: 6,
//   };
//   const dayNumber = newDate.getDay();
//   let needAddDays = null;

//   if (currectDayNumber[dayNumber] < 5) {
//     needAddDays = 5 - currectDayNumber[dayNumber];
//   } else {
//     needAddDays = 7 - currectDayNumber[dayNumber] + 5;
//   }

//   newDate.setDate(newDate.getDate() + needAddDays);

//   return newDate;
// }

// second way
function getNextFriday(date) {
  const newDate = new Date(date);

  do {
    newDate.setDate(newDate.getDate() + 1);
  } while (newDate.getDay() !== 5);

  return newDate;
}

/**
 * Returns the number of days in a specified month and year.
 *
 * @param {number} month - The month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The year as a four-digit number.
 * @return {number}
 *
 * @example:
 * 1, 2024 => 31
 * 2, 2024 => 29
 */
function getCountDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

/**
 * Returns the total number of days between two dates, including both the start and end dates.
 *
 * @param {string} dateStart - The start date of the period in ISO 8601 format.
 * @param {string} dateEnd - The end date of the period in ISO 8601 format.
 * @return {number} - The total count of days in the period.
 *
 * @example:
 * '2024-02-01T00:00:00.000Z', '2024-02-02T00:00:00.000Z'  => 2
 * '2024-02-01T00:00:00.000Z', '2024-02-12T00:00:00.000Z'  => 12
 */
function getCountDaysOnPeriod(dateStart, dateEnd) {
  const timestamp = new Date(dateEnd) - new Date(dateStart);

  return Math.floor(timestamp / 1000 / 3600 / 24) + 1;
}

/**
 * Returns true if a given date is within a specified range, including both the start and end dates.
 *
 * @typedef {{
 * start: string, // The start date in ISO 8601 format (e.g., 'YYYY-MM-DD').
 * end: string    // The end date in ISO 8601 format.
 * }} DatePeriod
 *
 * @param {string} date - The date to check, in ISO 8601 format.
 * @param {DatePeriod} period - The period to check against.
 * @return {boolean} - True if the date is within the range, false otherwise.
 *
 * @example:
 * '2024-02-01', { start: '2024-02-02', end: '2024-03-02' } => false
 * '2024-02-02', { start: '2024-02-02', end: '2024-03-02' } => true
 * '2024-02-10', { start: '2024-02-02', end: '2024-03-02' } => true
 */
function isDateInPeriod(date, period) {
  const dataTimestamp = new Date(date).getTime();
  const startDateTimestamp = new Date(period.start).getTime();
  const endDateTimestamp = new Date(period.end).getTime();

  return (
    dataTimestamp >= startDateTimestamp && dataTimestamp <= endDateTimestamp
  );
}

/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 *
 * @param {string} date - The date to be formatted, in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @return {string} - The date formatted in 'Month/Day/Year, Hour:Minute:Second AM/PM'.
 *
 * @example:
 * '2024-02-01T15:00:00.000Z' => '2/1/2024, 3:00:00 PM'
 * '1999-01-05T02:20:00.000Z' => '1/5/1999, 2:20:00 AM'
 * '2010-12-15T22:59:00.000Z' => '12/15/2010, 10:59:00 PM'
 */
function formatDate(date) {
  const newDate = new Date(date);

  const year = String(newDate.getUTCFullYear());
  const month = String(newDate.getUTCMonth() + 1);
  const day = String(newDate.getUTCDate());
  let hours = newDate.getUTCHours();
  const minutes = String(newDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(newDate.getUTCSeconds()).padStart(2, '0');
  const timePostfix = hours < 12 ? 'AM' : 'PM';

  hours = hours > 12 ? (hours % 13) + 1 : hours;

  return `${month}/${day}/${year}, ${hours}:${minutes}:${seconds} ${timePostfix}`;
}

/**
 * Returns the total number of weekend days (Saturdays and Sundays) in a specified month and year.
 *
 * @param {number} month - The source month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The source year as a four-digit number.
 * @return {number} - The total count of weekend days in the month.
 *
 * @example:
 * 5, 2022 => 9
 * 12, 2023 => 10
 * 1, 2024 => 8
 */

// first way
// function getCountWeekendsInMonth(month, year) {
//   const date = new Date(year, month - 1);
//   const dateLastDay = new Date(year, month, 0);
//   const dayInMonth = dateLastDay.getDate();

//   let weekendCount = 0;

//   for (let i = 1; i <= dayInMonth; i += 1) {
//     const currentDayNumber = date.getDay();

//     if (currentDayNumber === 0 || currentDayNumber === 6) weekendCount += 1;

//     date.setDate(date.getDate() + 1);
//   }

//   return weekendCount;
// }

// second way
function getCountWeekendsInMonth(month, year) {
  const date = new Date(year, month - 1);
  const dateLastDay = new Date(year, month, 0);
  const dayInMonth = dateLastDay.getDate();

  let weekendCount = 8;

  for (let i = 29; i <= dayInMonth; i += 1) {
    const currentDayNumber = date.getDay();

    if (currentDayNumber === 0 || currentDayNumber === 6) weekendCount += 1;

    date.setDate(date.getDate() + 1);
  }

  return weekendCount;
}

/**
 * Returns the week number of the year for a given date.
 * The first week is the one that falls on January 1.
 * The first day of the week is Monday.
 *
 * @param {Date} date - The date for which to find the week number.
 * @return {number} - The week number of the year.
 *
 * @example:
 * Date(2024, 0, 3) => 1
 * Date(2024, 0, 31) => 5
 * Date(2024, 1, 23) => 8
 */
function getWeekNumberByDate(date) {
  const currectDayNumber = {
    0: 7,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
  };

  const year = date.getUTCFullYear();
  const yearStart = new Date(`${year}`);
  const firstDay = currectDayNumber[yearStart.getDay()];
  const dayInFirstWeek = 7 - firstDay + 1;
  const timestamp = date - yearStart;
  const dayCount = Math.ceil(timestamp / 1000 / 3600 / 24);

  let weekNumber = null;

  if (dayInFirstWeek === 7) {
    weekNumber = Math.ceil(dayCount / 7);
  } else {
    weekNumber = Math.ceil((dayCount - dayInFirstWeek) / 7) + 1;
  }

  return weekNumber;
}

/**
 * Returns the date of the next Friday the 13th from a given date.
 * Friday the 13th is considered an unlucky day in some cultures.
 *
 * @param {Date} date - The starting date to search from.
 * @return {Date} - The date of the next Friday the 13th.
 *
 * @example:
 * Date(2024, 0, 13) => Date(2024, 8, 13)
 * Date(2023, 1, 1) => Date(2023, 9, 13)
 */

// first way
// function getNextFridayThe13th(date) {
//   let dayNumber = null;
//   let dayName = null;

//   do {
//     date.setDate(date.getDate() + 1);

//     dayNumber = date.getDate();
//     dayName = date.getDay();
//   } while (!(dayNumber === 13 && dayName === 5));

//   return date;
// }

// second way
function getNextFridayThe13th(date) {
  let dayNumber = null;

  while (date.getDay() !== 5) {
    date.setDate(date.getDate() + 1);
  }

  while (dayNumber !== 13) {
    date.setDate(date.getDate() + 7);

    dayNumber = date.getDate();
  }

  return date;
}

/**
 * Returns the quarter of the year for a given date.
 *
 * @param {Date} date - The date for which to find the quarter.
 * @return {number} - The quarter of the year (1-4).
 *
 * @example:
 * Date(2024, 1, 13) => 1
 * Date(2024, 5, 1) => 2
 * Date(2024, 10, 10) => 4
 */
function getQuarter(date) {
  const monthNumber = date.getUTCMonth() + 1;

  return Math.ceil(monthNumber / 3);
}

/**
 * Generates an employee's work schedule within a specified date range, based on a pattern of working and off days.
 * The start and end dates of the period are inclusive.
 *
 * @typedef {{
 * start: string, // The start date in 'DD-MM-YYYY' format.
 * end: string    // The end date in 'DD-MM-YYYY' format.
 * }} DatePeriod
 *
 * @param {DatePeriod} period - The start and end dates of the period.
 * @param {number} countWorkDays - The number of consecutive working days.
 * @param {number} countOffDays - The number of consecutive days off.
 * @return {Array<string>} - An array of dates in 'DD-MM-YYYY' format representing the work schedule.
 *
 * @example:
 * { start: '01-01-2024', end: '15-01-2024' }, 1, 3 => ['01-01-2024', '05-01-2024', '09-01-2024', '13-01-2024']
 * { start: '01-01-2024', end: '10-01-2024' }, 1, 1 => ['01-01-2024', '03-01-2024', '05-01-2024', '07-01-2024', '09-01-2024']
 */

function transformDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const result = `${day}-${month}-${year}`;

  return result;
}

function getWorkSchedule(period, countWorkDays, countOffDays) {
  const startDate = period.start.split('-').reverse();
  const endDate = period.end.split('-').reverse();

  const newStartDateObj = new Date(Date.parse(startDate.join('-')));
  const newEndDateObj = new Date(Date.parse(endDate.join('-')));

  const currDate = newStartDateObj;

  const dateDifferTimestamp = newEndDateObj - newStartDateObj;
  const totalDayCount = Math.ceil(dateDifferTimestamp / 1000 / 3600 / 24);

  const scheduale = [];

  for (let i = 1; i <= totalDayCount; i += countOffDays) {
    for (let b = 1; b <= countWorkDays; b += 1) {
      const date = transformDate(currDate);

      currDate.setDate(currDate.getDate() + 1);

      scheduale.push(date);
    }

    i += countWorkDays;

    currDate.setDate(currDate.getDate() + countOffDays);
  }

  if (+currDate === +newEndDateObj) {
    const date = transformDate(currDate);
    scheduale.push(date);
  }

  return scheduale;
}

/**
 * Determines whether the year in the provided date is a leap year.
 * A leap year is a year divisible by 4, but not by 100, unless it is also divisible by 400.
 *
 * @param {Date} date - The date from which the year will be checked.
 * @return {boolean} - True if the year is a leap year, false otherwise.
 *
 * @example:
 * Date(2024, 2, 1) => true
 * Date(2022, 2, 1) => false
 * Date(2020, 2, 1) => true
 */
function isLeapYear(date) {
  const year = date.getFullYear();

  if (year % 4 === 0 && year % 100 !== 0) return true;
  if (year % 100 === 0 && year % 400 === 0) return true;

  return false;
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
