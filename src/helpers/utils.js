import {nanoid} from 'nanoid';
import {FilterType, SortType, TimeInMs} from './constants.js';

export const getSortedTripEvents = (tripEvents, sortType = SortType.EVENT) => {
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

export const getTripEventsByFilter = (tripEvents, filterType) => {
  const nowDate = new Date();

  switch (filterType) {
    case FilterType.FUTURE:
      return tripEvents.filter((tripEvent) => tripEvent.start > nowDate);
    case FilterType.PAST:
      return tripEvents.filter((tripEvent) => tripEvent.start < nowDate);
    default:
      return tripEvents;
  }
};

export const getTimeDifferenceText = (value, sign) => {
  let timeDifferenceText = ``;

  if (value > 0 && value < 10) {
    timeDifferenceText = `0` + value + sign;
  }

  if (value >= 10) {
    timeDifferenceText = value + sign;
  }

  return timeDifferenceText;
};

export const getTimeDifference = (start, end) => {
  const difference = end - start;
  const days = Math.trunc(difference / TimeInMs.DAY);
  const hours = Math.trunc((difference % TimeInMs.DAY) / TimeInMs.HOUR);
  const minutes = Math.round((difference % TimeInMs.HOUR) / TimeInMs.MINUTE);

  let tripEventDuration;

  if (days > 0) {
    tripEventDuration = `${getTimeDifferenceText(days, `D`)} ${getTimeDifferenceText(hours, `H`)} ${getTimeDifferenceText(minutes, `M`)}`;
  } else if (hours > 0) {
    tripEventDuration = `${getTimeDifferenceText(hours, `H`)} ${getTimeDifferenceText(minutes, `M`)}`;
  } else {
    tripEventDuration = `${getTimeDifferenceText(minutes, `M`)}`;
  }
  return tripEventDuration;
};

export const createEmptyTripEvent = () => {
  const newDate = new Date();

  return {
    type: `Taxi`,
    start: newDate,
    end: newDate,
    isFavorite: false,
    activeOffers: [],
    action: `to`,
    basePrice: ``,
    destination: {
      name: ``,
      description: ``,
      pictures: []
    },
    id: nanoid(),
  };
};

export const getCapitalizedText = (text) => {
  if (!text) {
    return text;
  }

  return text[0].toUpperCase() + text.slice(1);
};

