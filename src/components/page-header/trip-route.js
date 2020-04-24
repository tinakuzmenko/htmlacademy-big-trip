import {MONTHS} from '../../helpers/constants.js';
import {createElement, getTripEventsDates, getSortedTripEvents} from '../../helpers/utils.js';

const MAXIMUM_CITIES_SHOWN = 3;

const getTripRoute = (tripEvents) => {
  const tripEventsSortedByDate = getSortedTripEvents(tripEvents);
  const tripEventsCities = tripEventsSortedByDate.map((tripEvent) => tripEvent.city);

  return tripEventsCities.length <= MAXIMUM_CITIES_SHOWN ? tripEventsCities.join(` — `) : tripEventsCities.slice(0, 1) + ` — … — ` + tripEventsCities.slice(tripEventsCities.length - 1);
};

const getTripDates = (startDate, endDate) => {
  const startMonth = startDate.getMonth();
  const startDay = startDate.getDate();

  const endMonth = endDate.getMonth();
  const endDay = endDate.getDate();

  const sameMonthString = `${MONTHS[startMonth]} ${startDay} &nbsp;&mdash;&nbsp; ${endDay}`;
  const differentMonthesString = `${MONTHS[startMonth]} ${startDay} &nbsp;&mdash;&nbsp; ${endMonth} ${endDay}`;

  return startMonth === endMonth ? sameMonthString : differentMonthesString;
};

const renderTripRoute = (tripEventsList) => {
  const title = getTripRoute(tripEventsList);
  const tripDates = getTripEventsDates(tripEventsList).sort((a, b) => a - b);
  const tripDatesString = getTripDates(tripDates[0], tripDates[tripDates.length - 1]);

  return `<div class="trip-info__main">
            <h1 class="trip-info__title">${title}</h1>
            <p class="trip-info__dates">${tripDatesString}</p>
          </div>`;
};

export default class TripRoute {
  constructor(tripEventsList) {
    this._tripEventsList = tripEventsList;
    this._element = null;
  }

  getTemplate() {
    return renderTripRoute(this._tripEventsList);
  }

  getElement() {
    this._element = this._tripEventsList.length ? createElement(this.getTemplate()) : ``;
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
