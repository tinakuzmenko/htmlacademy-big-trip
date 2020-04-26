import {getTimeDifference} from '../components/page-main/trip-events/get-time-difference.js';
import {getRandomArrayItem, getRandomIntegerNumber, increaseCounter, parseDate} from '../helpers/utils.js';
import {generateEndDate, generateStartDate} from './generate-dates.js';
import {getPhotos} from './get-photos.js';
import {getRandomDescription} from './get-random-description.js';
import {getRandomOffers} from './get-random-offers.js';
import {eventActionsMap, eventDestinations, eventOffers, eventTypes} from './trip-event-mocks.js';

const generateTripEvent = () => {
  const hasOffers = Math.random() > 0.5;
  const type = getRandomArrayItem(eventTypes);
  const start = new Date(generateStartDate());
  const end = generateEndDate(start);

  return {
    type,
    start,
    end,
    action: eventActionsMap[type],
    parsedStartDate: parseDate(start),
    basePrice: getRandomIntegerNumber(10, 500),
    city: getRandomArrayItem(eventDestinations),
    description: getRandomDescription(),
    offers: hasOffers ? getRandomOffers(eventOffers) : null,
    photos: getPhotos(),
    timeDiff: getTimeDifference(start, end),
    counter: increaseCounter()
  };
};

const createTripEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTripEvent);
};

export {generateTripEvent, createTripEvents};

