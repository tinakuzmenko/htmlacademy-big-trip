const createTripDays = (dates) => {
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

export {createTripDays};
