import {SortType} from './constants.js';
import {getTimeDifference} from '../components/page-main/trip-events/get-time-difference.js';

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
    id: Date.parse(newDate)
  };
};

export {getRandomIntegerNumber, getRandomArrayItem, getSortedTripEvents, createEmptyTripEvent};
