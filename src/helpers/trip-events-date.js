const getSortedTripEvents = (tripEvents) => {
  return tripEvents.slice().sort((a, b) => a.start - b.start);
};

const getTripEventsDates = (tripEvents) => {
  return tripEvents.map((tripEvent) => {
    return new Date(tripEvent.start.getFullYear(), tripEvent.start.getMonth(), tripEvent.start.getDate());
  });
};

const createUniqueTripDays = (dates) => {
  const tripDays = [];

  dates.forEach((date) => {
    const dateUTCFormat = Date.parse(date);

    if (tripDays.indexOf(dateUTCFormat) === -1) {
      tripDays.push(dateUTCFormat);
    }
  });

  tripDays.sort((a, b) => a - b).forEach((date) => date);

  return tripDays;
};

export {getSortedTripEvents, getTripEventsDates, createUniqueTripDays};
