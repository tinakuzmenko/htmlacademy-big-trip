import TripDaysContainer from '../trip-days/trip-days-container.js';
import TripDay from '../trip-days/trip-day.js';
import TripEventsContainerComponent from './trip-events-container.js';
import {getTripDaysWithDates} from '../trip-days/get-trip-days-with-dates.js';
import {addTripEventToList} from './add-trip-events-to-list.js';

export default class TripEventsGroupedByDays {
  constructor(sortedTripEvents) {
    this._sortedTripEvents = sortedTripEvents;
    this._markup = new TripDaysContainer().getElement();
    this._tripDaysObjects = getTripDaysWithDates(this._sortedTripEvents);
    this._daysContainerCount = 0;
  }

  getElement() {
    this.renderEventsInDays();
    return this._markup;
  }

  renderEventsGroup() {
    this._tripDay = new TripDay(this._tripDaysObjects[this._daysContainerCount]);
    this._dayWrapper = this._tripDay.getElement();
    this._tripEventsContainer = new TripEventsContainerComponent().getElement();

    this._markup.append(this._dayWrapper);
    this._dayWrapper.append(this._tripEventsContainer);
  }

  renderEventsInDays() {
    this._sortedTripEvents.forEach((sortedTripEvent) => {
      const {parsedStartDate} = sortedTripEvent;
      const isTheSameDate = parsedStartDate === this._tripDaysObjects[this._daysContainerCount].date;

      if (!this._markup.querySelector(`.day`)) {
        this.renderEventsGroup();
      }

      if (!isTheSameDate) {
        if (this._daysContainerCount < this._tripDaysObjects.length - 1) {
          this._daysContainerCount++;
        }

        this.renderEventsGroup();
      }

      addTripEventToList(this._tripEventsContainer, sortedTripEvent);
    });
  }
}
