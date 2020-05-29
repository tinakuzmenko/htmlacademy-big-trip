import TripEventController from '../../../controllers/trip-event.js';
import {EMPTY_TRIP_EVENT_FORM} from '../../../helpers/constants.js';
import AbstractComponent from '../../abstract-component.js';

export default class NoTripEvents extends AbstractComponent {
  constructor(container, sortedTripEvents, offers, destinations, dataChangeHandler, tripEventsModel) {
    super();

    this._container = container;
    this._sortedTripEvents = sortedTripEvents;
    this._offers = offers;
    this._destinations = destinations;
    this._dataChangeHandler = dataChangeHandler;
    this._tripEventsModel = tripEventsModel;

    this._viewChangeHandler = this._viewChangeHandler.bind(this);
  }

  getTemplate() {
    return (
      `<p class="trip-events__msg">Click New Event to create your first point</p>`.trim()
    );
  }

  createNewEventForm() {
    this._viewChangeHandler();
    this._newTripEventController = new TripEventController(this._container, this._offers, this._destinations, this._dataChangeHandler, this._viewChangeHandler);

    this._newTripEventController.render(EMPTY_TRIP_EVENT_FORM);
  }

  _viewChangeHandler() {
    if (this._newTripEventController) {
      this._newTripEventController.destroy();
      this._newTripEventController = null;
      this._tripEventsModel.setIsCreatingMode();
    }
  }
}
