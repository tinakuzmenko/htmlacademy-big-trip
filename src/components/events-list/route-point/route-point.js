import {routeType, routeDestination, routeOffers, routeDescription} from './route-point-data.js';
import {getRandomIntegerNumber, getRandomArrayItem} from '../../utils.js';

const getRouteDescription = () => {
  const sentencesAmount = getRandomIntegerNumber(1, 5);
  let description = ``;

  for (let i = 0; i < sentencesAmount; i++) {
    description += routeDescription[i];
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

const getRoutePoint = () => {
  return {
    type: getRandomArrayItem(routeType),
    destinationName: getRandomArrayItem(routeDestination),
    offers: routeOffers,
    description: getRouteDescription(),
    photos: getPhotos(),
  };
};

export {getRoutePoint};
