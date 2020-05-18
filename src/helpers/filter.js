import {FilterType} from './constants.js';

const getTripEventsByFilter = (tripEvents, filterType) => {
  const nowDate = new Date();

  switch (filterType) {
    case FilterType.FUTURE:
      return tripEvents.filter((tripEvent) => tripEvent.start > nowDate);
    case FilterType.PAST:
      return tripEvents.filter((tripEvent) => tripEvent.start < nowDate);
    default:
      return tripEvents;
  }
};

export {getTripEventsByFilter};
