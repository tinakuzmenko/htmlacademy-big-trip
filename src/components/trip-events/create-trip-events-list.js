import {increaseCounter, getRandomIntegerNumber, getRandomArrayItem} from '../../helpers/utils.js';
import {getPhotos} from '../../helpers/get-photos.js';
import {getRandomDescription} from '../../mocks/get-random-description.js';
import {getRandomOffers} from '../../mocks/get-random-offers.js';
import {generateStartDate, generateEndDate} from '../../mocks/generate-dates.js';
import {getTimeDifference} from '../../helpers/get-event-time-difference.js';
import {eventTypes, eventActionsMap, eventDestinations, eventOffers} from '../../mocks/trip-event-mocks.js';


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
    counter: increaseCounter()
  };
};

const createTripEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(getTripEvent);
};

export {getTripEvent, createTripEvents};
