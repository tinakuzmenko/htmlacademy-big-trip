import TripDayComponent from '../trip-days/trip-day.js';
import TripEventsContainerComponent from '../trip-events/trip-events-container.js';
import TripEventController from '../../../controllers/trip-event.js';
import {render} from '../../../helpers/render.js';
import {TimeInMs} from '../../../helpers/constants.js';

export default class TripEventsGroupedByDays {
  constructor(container, sortedTripEvents, offers, destinations, dataChangeHandler, tripEventsModel) {
    this._container = container;
    this._sortedTripEvents = sortedTripEvents;
    this._offers = offers;
    this._destinations = destinations;
    this._dataChangeHandler = dataChangeHandler;
    this._tripEventsModel = tripEventsModel;

    this._tripDayObject = null;
    this._daysDifference = 0;
    this._daysContainerCount = 1;
    this._tripEventsControllers = [];

    this._viewChangeHandler = this._viewChangeHandler.bind(this);
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

      const tripEventController = new TripEventController(this._tripEventsContainer, this._offers, this._destinations, this._dataChangeHandler, this._viewChangeHandler);

      this._tripEventsControllers.push(tripEventController);
      tripEventController.render(sortedTripEvent);
    });

    return this._container;
  }

  createNewEventForm() {
    this._viewChangeHandler();
    this._newTripEventController = new TripEventController(this._container, this._offers, this._destinations, this._dataChangeHandler, this._viewChangeHandler);
    this._newTripEventController.render(null);
  }

  _renderEventsGroup() {
    this._tripDay = new TripDayComponent(this._tripDayObject);
    this._tripEventsContainer = new TripEventsContainerComponent();

    render(this._container, this._tripDay);
    render(this._tripDay.getElement(), this._tripEventsContainer);
  }

  _viewChangeHandler() {
    this._tripEventsControllers.forEach((renderedTripEvent) => renderedTripEvent.setDefaultView());

    if (this._newTripEventController) {
      this._newTripEventController.destroy();
      this._newTripEventController = null;
      this._tripEventsModel.setIsCreatingMode(false);
    }
  }
}
