const getTripEvensDates = (tripEvents) => {
  return tripEvents.map((tripEvent) => {
    return new Date(tripEvent.start.getFullYear(), tripEvent.start.getMonth(), tripEvent.start.getDate());
  });
};

export {getTripEvensDates};
