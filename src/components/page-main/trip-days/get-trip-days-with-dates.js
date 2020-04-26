import {TimeInMs} from '../../../helpers/constants.js';
import {getTripEventsDates} from '../../../helpers/utils.js';

const getDaysDifference = (tripDays) => {
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

const getTripDays = (uniqueTripEventsDates) => {
  const tripDaysCounters = getDaysDifference(uniqueTripEventsDates);
  const tripDays = Array.of(1);

  for (let i = 1; i < tripDaysCounters.length; i++) {
    tripDays.push(tripDays[i - 1] + tripDaysCounters[i]);
  }

  return tripDays;
};

const createUniqueTripDays = (sortedDates) => {
  const allTripEventsDates = getTripEventsDates(sortedDates);
  const tripDays = [];

  allTripEventsDates.forEach((date) => {
    const dateUTCFormat = Date.parse(date);

    if (tripDays.indexOf(dateUTCFormat) === -1) {
      tripDays.push(dateUTCFormat);
    }
  });

  tripDays.sort((a, b) => a - b).forEach((date) => date);

  return tripDays;
};

const getTripDaysWithDates = (sortedTripEvents) => {
  const uniqueTripEventsDates = createUniqueTripDays(sortedTripEvents);
  const tripDays = getTripDays(uniqueTripEventsDates);

  return tripDays.map((day, index) => {
    return {
      counter: day,
      date: uniqueTripEventsDates[index],
    };
  });
};

export {getTripDaysWithDates};

