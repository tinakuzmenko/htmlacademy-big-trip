import {getRandomIntegerNumber, getRandomArrayItem} from '../../../helpers/utils.js';
import {getPhotos} from './get-photos.js';
import {getRandomDescription} from './get-random-description';
import {getRandomOffers} from './get-random-offers.js';
import {generateStartDate, generateEndDate, getTimeDifference} from './generate-dates.js';
import {eventTypes, eventActionsMap, eventDestinations, eventOffers} from './trip-event-mocks.js';

const getTripEvent = () => {
  const hasOffers = Math.random() > 0.5;
  const type = getRandomArrayItem(eventTypes);
  const start = new Date(generateStartDate());
  const end = generateEndDate(start);

  return {
    type,
    start,
    end,
    action: eventActionsMap[type],
    basePrice: getRandomIntegerNumber(10, 500),
    city: getRandomArrayItem(eventDestinations),
    description: getRandomDescription(),
    offers: hasOffers === true ? getRandomOffers(eventOffers) : null,
    photos: getPhotos(),
    timeDiff: getTimeDifference(start, end),
  };
};

const generateTripEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(getTripEvent);
};

export {getTripEvent, generateTripEvents};
