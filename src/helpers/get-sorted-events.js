const getSortedEvents = (events) => {
  return events.slice().sort((a, b) => a.start - b.start);
};

export {getSortedEvents};
