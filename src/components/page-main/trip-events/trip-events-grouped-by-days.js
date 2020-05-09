import AbstractViewComponent from '../../abstract-view-component.js';
import TripDayComponent from '../trip-days/trip-day.js';
import TripEventsContainerComponent from '../trip-events/trip-events-container.js';
import TripEventController from '../../../controllers/trip-event.js';
import {render} from '../../../helpers/render.js';
import {TimeInMs} from '../../../helpers/constants.js';

export default class TripEventsGroupedByDays extends AbstractViewComponent {
  constructor(container, sortedTripEvents) {
    super();
    this._container = container;
    this._sortedTripEvents = sortedTripEvents;
    this._tripDayObject = null;
    this._daysDifference = 0;
    this._daysContainerCount = 1;
  }

  getElement() {
    this._sortedTripEvents.forEach((sortedTripEvent) => {
      const parsedStartDate = sortedTripEvent.parsedStartDate;

      if (!this._tripDayObject) {
        this.getTripDayObject(sortedTripEvent);
        this._renderEventsGroup();
      }

      if (parsedStartDate !== this._tripDayObject.parsedDate) {
        this._oldParsedDate = this._tripDayObject.parsedDate;

        this.getTripDayObject(sortedTripEvent);
        this.getDayContainerCount();
        this._renderEventsGroup();
      }

      const tripEventController = new TripEventController(this._tripEventsContainer, this._dataChangeHandler, this._viewChangeHandler);

      this._tripEventsControllers.push(tripEventController);
      tripEventController.render(sortedTripEvent);
    });

    return this._container;
  }

  _renderEventsGroup() {
    this._tripDay = new TripDayComponent(this._tripDayObject);
    this._tripEventsContainer = new TripEventsContainerComponent();

    render(this._container, this._tripDay);
    render(this._tripDay.getElement(), this._tripEventsContainer);
  }

  getTripDayObject(sortedTripEvent) {
    this._tripEventStartDate = sortedTripEvent.start;
    this._tripDay = new Date(this._tripEventStartDate.getFullYear(), this._tripEventStartDate.getMonth(), this._tripEventStartDate.getDate());

    this._tripDayObject = {
      counter: this._daysContainerCount,
      date: this._tripDay,
      parsedDate: Date.parse(this._tripDay)
    };
  }

  getDayContainerCount() {
    const daysDifference = (this._tripDayObject.parsedDate - this._oldParsedDate) / TimeInMs.DAY;
    this._daysContainerCount = this._daysContainerCount + daysDifference;
    this._tripDayObject.counter = this._daysContainerCount;
  }
}
