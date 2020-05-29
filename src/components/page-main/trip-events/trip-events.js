import TripEventController from '../../../controllers/trip-event.js';
import {render} from '../../../helpers/render.js';
import TripDayEmptyComponent from '../trip-days/trip-day-empty.js';
import TripEventsContainerComponent from './trip-events-container.js';

export default class TripEvents {
  constructor(container, sortedTripEvents, offers, destinations, dataChangeHandler) {
    this._container = container;
    this._sortedTripEvents = sortedTripEvents;
    this._offers = offers;
    this._destinations = destinations;
    this._dataChangeHandler = dataChangeHandler;
    this._tripEventsControllers = [];

    this._viewChangeHandler = this._viewChangeHandler.bind(this);
  }

  getElement() {
    this._tripDay = new TripDayEmptyComponent();
    this._tripEventsContainer = new TripEventsContainerComponent();

    render(this._tripDay.getElement(), this._tripEventsContainer);
    render(this._container, this._tripDay);

    this._sortedTripEvents.forEach((sortedTripEvent) => {
      const tripEventController = new TripEventController(this._tripEventsContainer, this._offers, this._destinations, this._dataChangeHandler, this._viewChangeHandler);

      this._tripEventsControllers.push(tripEventController);
      tripEventController.render(sortedTripEvent);
    });

    return this._container;
  }

  _viewChangeHandler() {
    this._tripEventsControllers.forEach((renderedTripEvent) => renderedTripEvent.setDefaultView());
  }
}
