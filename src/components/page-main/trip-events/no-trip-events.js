import AbstractComponent from '../../abstract-component.js';
import TripEventController from '../../../controllers/trip-event.js';

export default class NoTripEvents extends AbstractComponent {
  constructor(container, sortedTripEvents, offers, destinations, dataChangeHandler, tripEventsModel) {
    super();

    this._container = container;
    this._sortedTripEvents = sortedTripEvents;
    this._offers = offers;
    this._destinations = destinations;
    this._dataChangeHandler = dataChangeHandler;
    this._tripEventsModel = tripEventsModel;
  }

  getTemplate() {
    return (
      `<p class="trip-events__msg">Click New Event to create your first point</p>`.trim()
    );
  }

  createNewEventForm() {
    this._newTripEventController = new TripEventController(this._container, this._offers, this._destinations, this._dataChangeHandler);

    this._newTripEventController.render(null);
  }
}
