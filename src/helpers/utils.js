import {SortType} from './constants.js';

let counter = 1;

const increaseCounter = () => {
  return counter++;
};

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

export {increaseCounter, getRandomIntegerNumber, getRandomArrayItem, getSortedTripEvents};
