import {eventType, eventDestination, eventDescription, eventOffers} from './event-data.js';
import {getRandomIntegerNumber, getRandomArrayItem} from '../../utils.js';

const getEventDescription = () => {
  const sentencesAmount = getRandomIntegerNumber(1, 5);
  let description = ``;

  for (let i = 0; i < sentencesAmount; i++) {
    description += eventDescription[i];
  }

  return description.trim();
};

const getPhotos = () => {
  const photosAmount = getRandomIntegerNumber(1, 5);
  let photos = [];

  for (let i = 0; i < photosAmount; i++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return photos;
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const getEvent = () => {
  const hasOffers = Math.random() > 0.5;

  return {
    type: getRandomArrayItem(eventType),
    destinationName: getRandomArrayItem(eventDestination),
    description: getEventDescription(),
    photos: getPhotos(),
    startDateAndTime: getRandomDate(),
    endDateAndTime: getRandomDate(),
    basePrice: getRandomIntegerNumber(20, 100),
    offers: hasOffers === true ? eventOffers : ``
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(getEvent);
};

export {generateEvents};
