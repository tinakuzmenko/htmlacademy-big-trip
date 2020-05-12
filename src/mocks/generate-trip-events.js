import {getTimeDifference} from '../components/page-main/trip-events/get-time-difference.js';
import {getPhotos} from './get-photos.js';
import {getRandomDescription} from './get-random-description.js';
import {getRandomArrayItem, getRandomIntegerNumber, increaseCounter, parseDate} from '../helpers/utils.js';
import {eventActionsMap} from '../helpers/constants.js';
import {generateEndDate, generateStartDate} from './generate-dates.js';
import {getRandomOffers} from './get-random-offers.js';
import {eventOffers, eventTypes, eventDestinations} from './trip-event-mocks.js';

const generateTripEventDestination = () => {
  return {
    description: getRandomDescription(),
    name: getRandomArrayItem(eventDestinations),
    photos: getPhotos()
  };
};

const generateTripEvent = () => {
  const isFavorite = Math.random() > 0.5;
  const type = getRandomArrayItem(eventTypes);
  const start = new Date(generateStartDate());
  const end = generateEndDate(start);
  const activeOffers = eventOffers[type.toLowerCase()] ? getRandomOffers(eventOffers[type.toLowerCase()]) : null;

  return {
    type,
    start,
    end,
    isFavorite,
    activeOffers,
    action: eventActionsMap[type],
    parsedStartDate: parseDate(start),
    basePrice: getRandomIntegerNumber(10, 500),
    destination: generateTripEventDestination(),
    offers: eventOffers[type.toLowerCase()],
    timeDiff: getTimeDifference(start, end),
    id: increaseCounter()
  };
};

const createTripEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTripEvent);
};

export {generateTripEvent, createTripEvents};

