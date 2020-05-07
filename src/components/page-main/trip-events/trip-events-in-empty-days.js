import TripDaysContainer from '../trip-days/trip-days-container.js';
import EmptyTripDayComponent from '../trip-days/trip-day-empty.js';
import TripEventsContainerComponent from './trip-events-container.js';
import {render} from '../../../helpers/render.js';

export default class TripEventsInEmptyDays {
  constructor(tripEventsControllers) {
    this._tripEventsControllers = tripEventsControllers;
    this._markup = new TripDaysContainer().getElement();
  }

  getElement() {
    this._renderEventsInEmptyDays();
    return this._markup;
  }

  _renderEventsInEmptyDays() {
    this._tripDay = new EmptyTripDayComponent();
    this._tripEventsContainer = new TripEventsContainerComponent();

    render(this._markup, this._tripDay);
    render(this._tripDay.getElement(), this._tripEventsContainer);

    this._tripEventsControllers.forEach((tripEventsController) => {
      this._tripEventsContainer.getElement().append(tripEventsController.render());
    });
  }
}
