import AbstractViewComponent from '../../abstract-view-component.js';
import EmptyTripDayComponent from '../trip-days/trip-day-empty.js';
import TripEventsContainerComponent from './trip-events-container.js';
import TripEventController from '../../../controllers/trip-event.js';
import {render} from '../../../helpers/render.js';

export default class TripEventsInEmptyDays extends AbstractViewComponent {
  constructor(container, sortedTripEvents, dataChangeHandler) {
    super();
    this._container = container;
    this._sortedTripEvents = sortedTripEvents;
    this._dataChangeHandler = dataChangeHandler;

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
  }

  getElement() {
    this._tripDay = new EmptyTripDayComponent();
    this._tripEventsContainer = new TripEventsContainerComponent();

    render(this._tripDay.getElement(), this._tripEventsContainer);
    render(this._container, this._tripDay);

    this._sortedTripEvents.forEach((sortedTripEvent) => {
      const tripEventController = new TripEventController(this._tripEventsContainer, this._dataChangeHandler, this._viewChangeHandler);

      this._tripEventsControllers.push(tripEventController);
      tripEventController.render(sortedTripEvent);
    });

    return this._container;
  }
}
