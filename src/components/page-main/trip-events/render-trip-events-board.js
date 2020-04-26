import NoTripEventsComponent from './no-trip-events.js';
import TripSortComponent from '../trip-sort/trip-sort.js';
import TripDaysContainerComponent from "../trip-days/trip-days-container.js";
import {renderEventsInDays} from './render-events-in-days.js';
import {render} from '../../../helpers/render.js';

const renderTripEventsBoard = (tripEvents, tripEventsSection) => {
  if (!tripEvents.length) {
    render(tripEventsSection, new NoTripEventsComponent());
    return;
  }

  render(tripEventsSection, new TripSortComponent());
  render(tripEventsSection, new TripDaysContainerComponent());

  const daysContainer = tripEventsSection.querySelector(`.trip-days`);

  renderEventsInDays(tripEvents, daysContainer);
};

export {renderTripEventsBoard};
