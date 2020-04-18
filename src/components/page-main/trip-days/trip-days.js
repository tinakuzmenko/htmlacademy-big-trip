import {MONTHS, TimeInMs} from '../../../helpers/constants.js';

const createTripDaysCounters = (tripDays) => {
  const tripDaysCounters = [];
  const startCounterNumber = 0;

  for (let i = tripDays.length - 1; i > 0; i--) {
    const dayDifference = (tripDays[i] - tripDays[i - 1]) / TimeInMs.DAY;
    tripDaysCounters.push(dayDifference);
  }

  tripDaysCounters.reverse();
  tripDaysCounters.unshift(startCounterNumber);

  return tripDaysCounters;
};

const getTripDays = (tripDaysCounters) => {
  const tripDays = Array.of(1);

  for (let i = 1; i < tripDaysCounters.length; i++) {
    tripDays.push(tripDays[i - 1] + tripDaysCounters[i]);
  }

  return tripDays;
};

const getTripDaysWithDates = (tripDays, uniqueTripEventsDates) => {
  return tripDays.map((day, index) => {
    return {
      counter: day,
      date: uniqueTripEventsDates[index],
    };
  });
};

const renderTripDay = (dayObject) => {
  const {date, counter} = dayObject;

  const dateString = new Date(date);

  const dateValue = dateString.getDate();
  const monthValue = dateString.getMonth();
  const yearValue = dateString.getFullYear();

  return `<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${counter}</span>
                <time class="day__date" datetime="${yearValue}-${monthValue + 1}-${dateValue}">${MONTHS[monthValue]} ${dateValue}</time>
              </div>
          </li>`;
};

export {createTripDaysCounters, getTripDays, getTripDaysWithDates, renderTripDay};
