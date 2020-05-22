import {SortType, TimeInMs} from './constants.js';

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

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

  if (value > 10) {
    timeString = value + signString;
  }

  return timeString;
};

const getTimeDifference = (start, end) => {
  const difference = end - start;

  const days = Math.trunc(difference / TimeInMs.DAY);
  const daysString = createTimeString(days, `D`);

  const hours = Math.trunc((difference % TimeInMs.DAY) / TimeInMs.HOUR);
  const hoursString = createTimeString(hours, `H`);

  const minutes = Math.trunc(((difference % TimeInMs.DAY) % TimeInMs.HOUR) / TimeInMs.MINUTE);
  const minutesString = createTimeString(minutes, `M`);

  return `${daysString} ${hoursString} ${minutesString}`;
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

export {getRandomIntegerNumber, getRandomArrayItem, getSortedTripEvents, createEmptyTripEvent, getTimeDifference};
