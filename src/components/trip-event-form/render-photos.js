const renderPhotos = (photos) => {
  return photos.map((photo) => {
    return (`<img class="event__photo" src="${photo}" alt="Event photo">`);
  })
  .join(`\n`);
};

export {renderPhotos};
