import moment from 'moment';
import {getPhotos} from './get-photos.js';
import {getRandomDescription} from './get-random-description.js';
import {getRandomArrayItem, getRandomIntegerNumber, getTimeDifference} from '../helpers/utils.js';
import {eventActionsMap} from '../helpers/constants.js';
import {generateEndDate, generateStartDate} from './generate-dates.js';
import {getRandomOffers} from './get-random-offers.js';
import {eventOffers, eventTypes, eventDestinations} from './trip-event-mocks.js';

const generateTripEventDestination = () => {
  return {
    name: getRandomArrayItem(eventDestinations),
    description: getRandomDescription(),
    photos: getPhotos()
  };
};

const generateTripEvent = () => {
  const isFavorite = Math.random() > 0.5;
  const type = getRandomArrayItem(eventTypes);
  const start = new Date(generateStartDate());
  const end = generateEndDate(start);
  const activeOffers = eventOffers[type.toLowerCase()] ? getRandomOffers(eventOffers[type.toLowerCase()]) : null;
  const id = Date.parse(new Date()) + Math.random();

  return {
    type,
    start,
    end,
    isFavorite,
    activeOffers,
    id,
    action: eventActionsMap[type],
    parsedStartDate: Date.parse(moment(start).startOf(`date`)),
    basePrice: getRandomIntegerNumber(10, 500),
    destination: generateTripEventDestination(),
    offers: eventOffers[type.toLowerCase()],
    timeDiff: getTimeDifference(start, end),
  };
};

const createTripEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTripEvent);
};

export {generateTripEvent, createTripEvents};

