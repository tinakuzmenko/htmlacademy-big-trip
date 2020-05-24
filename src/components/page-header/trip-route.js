import {getSortedTripEvents} from '../../helpers/utils.js';
import AbstractSmartComponent from '../abstract-smart-component.js';
import {render, remove} from '../../helpers/render.js';
import moment from 'moment';

export default class TripRoute extends AbstractSmartComponent {
  constructor(container, tripEventsModel) {
    super();
    this._container = container;
    this._tripEventsModel = tripEventsModel;

    this._MAXIMUM_CITIES_SHOWN = 3;

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._tripEventsModel.setDataChangeHandler(this._dataChangeHandler);
  }

  render() {
    remove(this);
    render(this._container, this);
  }

  getTemplate() {
    const title = this._getTripRoute();
    const tripDates = this._getTripEventsDates();
    const tripDatesString = this._getTripDates(tripDates[0], tripDates[tripDates.length - 1]);

    return `<div class="trip-info__main">
            <h1 class="trip-info__title">${title}</h1>
            <p class="trip-info__dates">${tripDatesString}</p>
          </div>`;
  }

  _getTripRoute() {
    this._tripEvents = this._tripEventsModel.getTripEvents();

    const tripEventsSortedByDate = getSortedTripEvents(this._tripEvents);
    const tripEventsCities = tripEventsSortedByDate.map((tripEvent) => tripEvent.destination.name);

    return tripEventsCities.length <= this._MAXIMUM_CITIES_SHOWN ? tripEventsCities.join(` — `) : tripEventsCities.slice(0, 1) + ` — … — ` + tripEventsCities.slice(tripEventsCities.length - 1);
  }

  _getTripEventsDates() {
    const tripEventsStartDates = this._tripEvents.map((tripEvent) => {
      return moment(tripEvent.start).startOf(`date`);
    }).sort((a, b) => a - b);

    const tripEventsEndDates = this._tripEvents.map((tripEvent) => {
      return moment(tripEvent.end).startOf(`date`);
    }).sort((a, b) => a - b);

    return [tripEventsStartDates[0], tripEventsEndDates[tripEventsEndDates.length - 1]];
  }

  _getTripDates(startDate, endDate) {
    if (moment(startDate).format(`MMM`) === moment(endDate).format(`MMM`)) {
      return `${moment(startDate).format(`MMM D`)} &nbsp;&mdash;&nbsp; ${moment(endDate).format(`D`)}`;
    } else {
      return `${moment(startDate).format(`MMM D`)} &nbsp;&mdash;&nbsp; ${moment(endDate).format(`MMM D`)}`;
    }
  }

  _dataChangeHandler() {
    this.render();
  }
}
