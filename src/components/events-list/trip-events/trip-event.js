import {eventTypes, eventActionsMap, eventDestinations, eventDescriptions, eventOffers, getPhotoLink} from './trip-event-data.js';
import {getRandomIntegerNumber, getRandomArrayItem} from '../../utils.js';

const getTripEventDescription = () => {
  const sentencesAmount = getRandomIntegerNumber(1, 5);
  let description = ``;

  for (let i = 0; i < sentencesAmount; i++) {
    description += eventDescriptions[i];
  }

  return description.trim();
};

const getPhotos = () => {
  const photosAmount = getRandomIntegerNumber(1, 5);
  return new Array(photosAmount)
    .fill(``)
    .map(getPhotoLink);
};

// const getRandomDate = (date) => {
//   const periodLength = getRandomIntegerNumber(1, 7);
//   const tripEventsEndDate = date.setDate(date.getDate() + periodLength);

//   return tripEventsEndDate;
// };

const getRandomOffers = (offers) => {
  const offersAmount = getRandomIntegerNumber(1, 5);
  const randomOffers = [];

  for (let i = 0; i < offersAmount; i++) {
    const offer = getRandomArrayItem(offers);
    if (randomOffers.indexOf(offer) === -1) {
      randomOffers.push(offer);
    }
  }

  return randomOffers;
};

const getTripEvent = () => {
  const hasOffers = Math.random() > 0.5;
  const type = getRandomArrayItem(eventTypes);

  return {
    type,
    city: getRandomArrayItem(eventDestinations),
    description: getTripEventDescription(),
    photos: getPhotos(),
    // date: getRandomDate(),
    action: eventActionsMap[type],
    // startTime: getRandomDate(),
    // endTime: getRandomDate(),
    basePrice: getRandomIntegerNumber(10, 500),
    offers: hasOffers === true ? getRandomOffers(eventOffers) : null
  };
};

const generateTripEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(getTripEvent);
};

export {getTripEvent, generateTripEvents};
