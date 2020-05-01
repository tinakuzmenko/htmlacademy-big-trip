import TripDaysContainer from '../trip-days/trip-days-container.js';
import EmptyTripDayComponent from '../trip-days/empty-trip-day.js';
import TripEventsContainerComponent from './trip-events-container.js';
import {addTripEventToList} from "./add-trip-events-to-list.js";

export default class TripEventsInEmptyDays {
  constructor(sortedTripEvents) {
    this._sortedTripEvents = sortedTripEvents;
    this._markup = new TripDaysContainer().getElement();
  }

  getElement() {
    this.renderEventsInEmptyDays();
    return this._markup;
  }

  renderEventsInEmptyDays() {
    this._tripDay = new EmptyTripDayComponent();
    this._dayWrapper = this._tripDay.getElement();
    this._tripEventsContainer = new TripEventsContainerComponent().getElement();

    this._markup.append(this._dayWrapper);
    this._dayWrapper.append(this._tripEventsContainer);

    this._sortedTripEvents.forEach((sortedTripEvent) => {
      addTripEventToList(this._tripEventsContainer, sortedTripEvent);
    });
  }
}
