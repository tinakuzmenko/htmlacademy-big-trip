import {getRandomIntegerNumber} from './utils.js';

const getPhotoLink = () => {
  return `http://picsum.photos/248/152?r=${Math.random()}`;
};

const getPhotos = () => {
  const photosAmount = getRandomIntegerNumber(1, 5);
  return new Array(photosAmount)
    .fill(``)
    .map(getPhotoLink);
};

export {getPhotos};
