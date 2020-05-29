import moment from 'moment';
import {RenderPosition} from '../../helpers/constants.js';
import {remove, render} from '../../helpers/render.js';
import {getSortedTripEvents} from '../../helpers/utils.js';
import AbstractComponent from '../abstract-component.js';

export default class TripRoute extends AbstractComponent {
  constructor(container, tripEventsModel) {
    super();
    this._container = container;
    this._tripEventsModel = tripEventsModel;

    this._MAXIMUM_CITIES_SHOWN = 3;

    this._dataChangeHandler = this._dataChangeHandler.bind(this);

    this._tripEventsModel.setDataChangeHandler(this._dataChangeHandler);
  }

  getTemplate() {
    this._tripEvents = this._tripEventsModel.getTripEvents();
    const title = this._getTripTitle();
    let tripDates = ``;

    if (this._tripEvents.length > 0) {
      const dates = this._getTripEventsDates();
      tripDates = this._getTripDatesTitle(dates[0], dates[dates.length - 1]);
    }

    return `<div class="trip-info__main">
              <h1 class="trip-info__title">${title}</h1>
              <p class="trip-info__dates">${tripDates}</p>
            </div>`;
  }

  render() {
    remove(this);
    render(this._container, this, RenderPosition.AFTERBEGIN);
  }

  _getTripTitle() {
    const tripEventsSortedByDate = getSortedTripEvents(this._tripEvents);
    const tripEventsCities = tripEventsSortedByDate.map((tripEvent) => tripEvent.destination.name);

    return tripEventsCities.length <= this._MAXIMUM_CITIES_SHOWN ? tripEventsCities.join(` — `) : tripEventsCities.slice(0, 1) + ` — … — ` + tripEventsCities.slice(tripEventsCities.length - 1);
  }

  _getTripEventsDates() {
    const tripEventsStartDates = this._tripEvents.map((tripEvent) => {
      return moment(tripEvent.start).startOf(`date`);
    }).sort((previousTripEventDate, nextTripEventDate) => previousTripEventDate - nextTripEventDate);

    const tripEventsEndDates = this._tripEvents.map((tripEvent) => {
      return moment(tripEvent.end).startOf(`date`);
    }).sort((previousTripEventDate, nextTripEventDate) => previousTripEventDate - nextTripEventDate);

    return [tripEventsStartDates[0], tripEventsEndDates[tripEventsEndDates.length - 1]];
  }

  _getTripDatesTitle(startDate, endDate) {
    if (moment(startDate).format(`MMM`) === moment(endDate).format(`MMM`)) {
      return `${moment(startDate).format(`MMM D`)} &nbsp;&mdash;&nbsp; ${moment(endDate).format(`D`)}`;
    }

    return `${moment(startDate).format(`MMM D`)} &nbsp;&mdash;&nbsp; ${moment(endDate).format(`MMM D`)}`;
  }

  _dataChangeHandler() {
    this.render();
  }
}
