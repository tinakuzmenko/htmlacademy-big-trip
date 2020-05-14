import {getSortedTripEvents} from '../../helpers/utils.js';
import AbstractComponent from '../abstract-component.js';
import moment from 'moment';

const MAXIMUM_CITIES_SHOWN = 3;

const getTripRoute = (tripEvents) => {
  const tripEventsSortedByDate = getSortedTripEvents(tripEvents);
  const tripEventsCities = tripEventsSortedByDate.map((tripEvent) => tripEvent.destination.name);

  return tripEventsCities.length <= MAXIMUM_CITIES_SHOWN ? tripEventsCities.join(` — `) : tripEventsCities.slice(0, 1) + ` — … — ` + tripEventsCities.slice(tripEventsCities.length - 1);
};

const getTripEventsDates = (tripEvents) => {
  const tripEventsStartDates = tripEvents.map((tripEvent) => {
    return moment(tripEvent.start).startOf(`date`);
  }).sort((a, b) => a - b);

  const tripEventsEndDates = tripEvents.map((tripEvent) => {
    return moment(tripEvent.end).startOf(`date`);
  }).sort((a, b) => a - b);

  return [tripEventsStartDates[0], tripEventsEndDates[tripEventsEndDates.length - 1]];
};

const getTripDates = (startDate, endDate) => {
  if (moment(startDate).format(`MMM`) === moment(endDate).format(`MMM`)) {
    return `${moment(startDate).format(`MMM D`)} &nbsp;&mdash;&nbsp; ${moment(endDate).format(`D`)}`;
  } else {
    return `${moment(startDate).format(`MMM D`)} &nbsp;&mdash;&nbsp; ${moment(endDate).format(`MMM D`)}`;
  }
};

const renderTripRoute = (tripEventsList) => {
  const title = getTripRoute(tripEventsList);
  const tripDates = getTripEventsDates(tripEventsList);
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
