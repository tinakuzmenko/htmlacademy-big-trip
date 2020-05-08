import TripDay from '../trip-days/trip-day.js';
import TripEventsContainerComponent from './trip-events-container.js';
import {TimeInMs} from '../../../helpers/constants.js';
import {render} from '../../../helpers/render.js';

export default class TripEventsGroupedByDays {
  constructor(container, tripEventsControllers) {
    this._container = container;
    this._tripEventsControllers = tripEventsControllers;
    this._tripDayObject = null;
    this._daysDifference = 0;
    this._daysContainerCount = 1;
  }

  getElement() {
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

      tripEventsController.render(this._tripEventsContainer);
    });

    return this._container;
  }

  _renderEventsGroup() {
    this._tripDay = new TripDay(this._tripDayObject);
    this._tripEventsContainer = new TripEventsContainerComponent();

    render(this._container, this._tripDay);
    render(this._tripDay.getElement(), this._tripEventsContainer);
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


}
