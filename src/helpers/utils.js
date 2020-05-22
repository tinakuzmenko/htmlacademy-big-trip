import {SortType, TimeInMs} from './constants.js';

const getSortedTripEvents = (tripEvents, sortType = SortType.EVENT) => {
  let sortedTripEvents = [];
  const tripEventsCopy = tripEvents.slice();

  switch (sortType) {
    case SortType.EVENT:
      sortedTripEvents = tripEventsCopy.sort((a, b) => a.start - b.start);
      break;
    case SortType.TIME:
      sortedTripEvents = tripEventsCopy.sort((a, b) => (b.end - b.start) - (a.end - a.start));
      break;
    case SortType.PRICE:
      sortedTripEvents = tripEventsCopy.sort((a, b) => b.basePrice - a.basePrice);
      break;
  }

  return sortedTripEvents;
};

const createTimeString = (value, signString) => {
  let timeString = ``;

  if (value > 0 && value < 10) {
    timeString = `0` + value + signString;
  }

  if (value >= 10) {
    timeString = value + signString;
  }

  return timeString;
};

const getTimeDifference = (start, end) => {
  const difference = end - start;
  const days = Math.trunc(difference / TimeInMs.DAY);
  const hours = Math.trunc((difference % TimeInMs.DAY) / TimeInMs.HOUR);
  const minutes = Math.round((difference % TimeInMs.HOUR) / TimeInMs.MINUTE);

  let string;

  if (days > 0) {
    string = `${createTimeString(days, `D`)} ${createTimeString(hours, `H`)} ${createTimeString(minutes, `M`)}`;
  } else if (hours > 0) {
    string = `${createTimeString(hours, `H`)} ${createTimeString(minutes, `M`)}`;
  } else {
    string = `${createTimeString(minutes, `M`)}`;
  }
  return string;
};

const createEmptyTripEvent = () => {
  const newDate = new Date();

  return {
    type: `Taxi`,
    start: newDate,
    end: newDate,
    isFavorite: false,
    activeOffers: [],
    action: `to`,
    parsedStartDate: ``,
    basePrice: ``,
    destination: {
      name: ``,
      description: ``,
      photos: []
    },
    offers: [],
    timeDiff: getTimeDifference(newDate, newDate),
    id: Date.parse(new Date()) + Math.random()
  };
};

const getCapitalizedString = (string) => {
  if (!string) {
    return string;
  }

  return string[0].toUpperCase() + string.slice(1);
};

export {getSortedTripEvents, createEmptyTripEvent, getTimeDifference, getCapitalizedString};
