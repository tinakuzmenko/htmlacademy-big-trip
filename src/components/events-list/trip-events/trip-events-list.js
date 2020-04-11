import {EVENTS_AMOUNT} from '../../../helpers/constants.js';
import {generateTripEvents} from './generate-trip-events.js';

const tripEventsList = generateTripEvents(EVENTS_AMOUNT);

const tripEventsCost = tripEventsList.reduce((total, cost) => {
  return cost.offers === null ? total + cost.basePrice : total + cost.basePrice + cost.offers.reduce((offersTotal, offer) => {
    return offersTotal + offer.price;
  }, 0);
}, 0);

// const tripEventsDates = tripEventsList.map((tripEvent) => {
//   return {
//     eventDate: tripEvent.start.getDate(),
//     eventMonth: tripEvent.start.getMonth()};
// }).sort((a, b) => a.eventDate - b.eventDate);

export {tripEventsList, tripEventsCost};
