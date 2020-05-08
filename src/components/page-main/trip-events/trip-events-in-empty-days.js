import EmptyTripDayComponent from '../trip-days/trip-day-empty.js';
import TripEventsContainerComponent from './trip-events-container.js';
import {render} from '../../../helpers/render.js';

export default class TripEventsInEmptyDays {
  constructor(container, tripEventsControllers) {
    this._container = container;
    this._tripEventsControllers = tripEventsControllers;
  }

  getElement() {
    this._tripDay = new EmptyTripDayComponent();
    this._tripEventsContainer = new TripEventsContainerComponent();

    render(this._tripDay.getElement(), this._tripEventsContainer);
    render(this._container, this._tripDay);

    this._tripEventsControllers.forEach((tripEventsController) => {
      tripEventsController.render(this._tripEventsContainer);
    });

    return this._container;
  }
}
