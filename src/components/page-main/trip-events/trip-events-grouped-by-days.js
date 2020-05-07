import TripDaysContainer from '../trip-days/trip-days-container.js';
import TripDay from '../trip-days/trip-day.js';
import TripEventsContainerComponent from './trip-events-container.js';
import {TimeInMs} from '../../../helpers/constants.js';
import {render} from '../../../helpers/render.js';

export default class TripEventsGroupedByDays {
  constructor(tripEventsControllers) {
    this._tripEventsControllers = tripEventsControllers;
    this._markup = new TripDaysContainer().getElement();
    this._tripDayObject = null;
    this._daysDifference = 0;
    this._daysContainerCount = 1;
  }

  getElement() {
    this._renderEventsInDays();
    return this._markup;
  }

  getTripDayObject(tripEventsController) {
    this._tripEventStartDate = tripEventsController.getStartDate();
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

  _renderEventsGroup() {
    this._tripDay = new TripDay(this._tripDayObject);
    this._tripEventsContainer = new TripEventsContainerComponent();

    render(this._markup, this._tripDay);
    render(this._tripDay.getElement(), this._tripEventsContainer);
  }

  _renderEventsInDays() {
    this._tripEventsControllers.forEach((tripEventsController) => {
      const parsedStartDate = tripEventsController.getParsedStartDate();

      if (!this._tripDayObject) {
        this.getTripDayObject(tripEventsController);
        this._renderEventsGroup();
      }

      if (parsedStartDate !== this._tripDayObject.parsedDate) {
        this._oldParsedDate = this._tripDayObject.parsedDate;

        this.getTripDayObject(tripEventsController);
        this.getDayContainerCount();
        this._renderEventsGroup();
      }

      this._tripEventsContainer.getElement().append(tripEventsController.render());
    });
  }
}
