import TripDaysContainer from '../trip-days/trip-days-container.js';
import EmptyTripDayComponent from '../trip-days/empty-trip-day.js';
import TripEventsContainerComponent from './trip-events-container.js';
import TripEventController from "../../../controllers/trip-event.js";

export default class TripEventsInEmptyDays {
  constructor(sortedTripEvents) {
    this._sortedTripEvents = sortedTripEvents;
    this._markup = new TripDaysContainer().getElement();
  }

  getElement() {
    this._renderEventsInEmptyDays();
    return this._markup;
  }

  _renderEventsInEmptyDays() {
    this._tripDay = new EmptyTripDayComponent();
    this._dayWrapper = this._tripDay.getElement();
    this._tripEventsContainer = new TripEventsContainerComponent().getElement();

    this._markup.append(this._dayWrapper);
    this._dayWrapper.append(this._tripEventsContainer);

    this._sortedTripEvents.forEach((sortedTripEvent) => {
      const tripEventController = new TripEventController(this._tripEventsContainer, sortedTripEvent);
      tripEventController.render(sortedTripEvent);
    });
  }
}
