import {getPhotos} from '../../../mocks/get-photos.js';

const renderPhotos = (photos) => {
  return photos.map((photo) => {
    return (
      `<img class="event__photo" src="${photo}" alt="Event photo">`.trim());
  })
  .join(`\n`);
};

export {getPhotos, renderPhotos};
