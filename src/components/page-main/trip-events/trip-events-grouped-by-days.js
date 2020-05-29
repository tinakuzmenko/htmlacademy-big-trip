import TripDayComponent from '../trip-days/trip-day.js';
import TripEventsContainerComponent from '../trip-events/trip-events-container.js';
import TripEventController from '../../../controllers/trip-event.js';
import {render} from '../../../helpers/render.js';
import {TimeInMs, EMPTY_TRIP_EVENT_FORM} from '../../../helpers/constants.js';
import moment from 'moment';

export default class TripEventsGroupedByDays {
  constructor(container, sortedTripEvents, offers, destinations, dataChangeHandler, tripEventsModel) {
    this._container = container;
    this._sortedTripEvents = sortedTripEvents;
    this._offers = offers;
    this._destinations = destinations;
    this._dataChangeHandler = dataChangeHandler;
    this._tripEventsModel = tripEventsModel;

    this._tripDay = null;
    this._daysDifference = 0;
    this._daysContainerCount = 1;
    this._tripEventsControllers = [];

    this._viewChangeHandler = this._viewChangeHandler.bind(this);
  }

  _getTripDay(sortedTripEvent) {
    this._tripEventStartDate = typeof sortedTripEvent.start === `string` ? new Date(sortedTripEvent.start) : sortedTripEvent.start;

    this._tripDay = new Date(this._tripEventStartDate.getFullYear(), this._tripEventStartDate.getMonth(), this._tripEventStartDate.getDate());

    this._tripDay = {
      counter: this._daysContainerCount,
      date: this._tripDay,
      parsedDate: Date.parse(this._tripDay)
    };
  }

  getDayContainerCount() {
    const daysDifference = (this._tripDay.parsedDate - this._oldParsedDate) / TimeInMs.DAY;
    this._daysContainerCount = this._daysContainerCount + daysDifference;
    this._tripDay.counter = this._daysContainerCount;
  }

  getElement() {
    this._sortedTripEvents.forEach((sortedTripEvent) => {
      const parsedStartDate = Date.parse(moment(sortedTripEvent.start).startOf(`date`));

      if (!this._tripDay) {
        this._getTripDay(sortedTripEvent);
        this._renderEventsGroup();
      }

      if (parsedStartDate !== this._tripDay.parsedDate) {
        this._oldParsedDate = this._tripDay.parsedDate;

        this._getTripDay(sortedTripEvent);
        this.getDayContainerCount();
        this._renderEventsGroup();
      }

      const tripEventController = new TripEventController(this._tripEventsContainer, this._offers, this._destinations, this._dataChangeHandler, this._viewChangeHandler);

      this._tripEventsControllers.push(tripEventController);
      tripEventController.render(sortedTripEvent);
    });

    return this._container;
  }

  createNewEventForm() {
    this._viewChangeHandler();
    this._newTripEventController = new TripEventController(this._container, this._offers, this._destinations, this._dataChangeHandler, this._viewChangeHandler);
    this._newTripEventController.render(EMPTY_TRIP_EVENT_FORM);
  }

  _renderEventsGroup() {
    this._tripDayComponent = new TripDayComponent(this._tripDay);
    this._tripEventsContainer = new TripEventsContainerComponent();

    render(this._container, this._tripDayComponent);
    render(this._tripDayComponent.getElement(), this._tripEventsContainer);
  }

  _viewChangeHandler() {
    this._tripEventsControllers.forEach((renderedTripEvent) => renderedTripEvent.setDefaultView());

    if (this._newTripEventController) {
      this._newTripEventController.destroy();
      this._newTripEventController = null;
      this._tripEventsModel.setIsCreatingMode();
    }
  }
}
