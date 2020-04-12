import {EVENTS_AMOUNT} from '../../helpers/constants.js';
import {createTripEvents} from './create-trip-events-list.js';

const tripEventsList = createTripEvents(EVENTS_AMOUNT);

const tripEventsDates = tripEventsList.map((tripEvent) => {
  return new Date(tripEvent.start.getFullYear(), tripEvent.start.getMonth(), tripEvent.start.getDate());
});

export {tripEventsList, tripEventsDates};
