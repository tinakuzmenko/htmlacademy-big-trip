import NoTripEventsComponent from './no-trip-events.js';
import TripSortComponent from '../trip-sort/trip-sort.js';
import TripDaysContainerComponent from "../trip-days/trip-days-container.js";
import {renderEventsInDays} from './render-events-in-days.js';
import {render} from '../../../helpers/utils.js';

const renderTripEventsBoard = (tripEvents, tripEventsSection) => {
  if (!tripEvents[0]) {
    render(tripEventsSection, new NoTripEventsComponent().getElement());
    return;
  }

  render(tripEventsSection, new TripSortComponent().getElement());
  render(tripEventsSection, new TripDaysContainerComponent().getElement());

  const daysContainer = tripEventsSection.querySelector(`.trip-days`);

  renderEventsInDays(tripEvents, daysContainer);
};

export {renderTripEventsBoard};
