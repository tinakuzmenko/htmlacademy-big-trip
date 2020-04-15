import {getRandomIntegerNumber} from '../../../helpers/utils.js';

const getPhotoLink = () => {
  return `http://picsum.photos/248/152?r=${Math.random()}`;
};

const getPhotos = () => {
  const photosAmount = getRandomIntegerNumber(1, 5);
  return new Array(photosAmount)
    .fill(``)
    .map(getPhotoLink);
};

const renderPhotos = (photos) => {
  return photos.map((photo) => {
    return (`<img class="event__photo" src="${photo}" alt="Event photo">`.trim());
  })
  .join(`\n`);
};

export {getPhotos, renderPhotos};
