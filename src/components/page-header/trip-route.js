import {MONTHS} from '../../helpers/constants.js';
import {getSortedTripEvents, getTripEventsDates} from '../../helpers/utils.js';
import AbstractComponent from '../abstract-component.js';

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

export default class TripRoute extends AbstractComponent {
  constructor(tripEvents) {
    super();
    this._tripEvents = tripEvents;
  }

  getTemplate() {
    return renderTripRoute(this._tripEvents);
  }
}
