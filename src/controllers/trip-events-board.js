import NoTripEventsComponent from '../components/page-main/trip-events/no-trip-events.js';
import TripEventsGroupedByDays from '../components/page-main/trip-events/trip-events-grouped-by-days.js';
import TripEventsInEmptyDays from '../components/page-main/trip-events/trip-events-in-empty-days.js';
import TripSortComponent from '../components/page-main/trip-sort/trip-sort.js';
import {SortType} from '../helpers/constants.js';
import {render} from '../helpers/render.js';
import {getSortedTripEvents} from '../helpers/utils.js';

export default class TripEventsBoardController {
  constructor(container) {
    this._container = container;
    this._noTasksComponent = new NoTripEventsComponent();
    this._sortComponent = new TripSortComponent();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  render(tripEvents) {
    this._tripEvents = tripEvents;

    if (!this._tripEvents.length) {
      render(this._container, this._noTasksComponent);
      return;
    }

    this._sortedTripEvents = getSortedTripEvents(this._tripEvents);

    render(this._container, this._sortComponent);

    this._renderTripEventsGroupedByDays(this._sortedTripEvents);
    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }

  _renderTripEventsGroupedByDays(sortedTripEvents) {
    const tripEventsGroupedByDays = new TripEventsGroupedByDays(sortedTripEvents);
    render(this._container, tripEventsGroupedByDays);
  }

  _renderTripEventsInEmptyDays(sortedTripEvents) {
    const tripEventsInEmptyDays = new TripEventsInEmptyDays(sortedTripEvents);
    render(this._container, tripEventsInEmptyDays);
  }

  _sortTypeChangeHandler(sortType) {
    this._sortedTripEvents = getSortedTripEvents(this._tripEvents, sortType);
    this._tripSortItemDay = this._sortComponent.getElement().querySelector(`.trip-sort__item--day`);

    switch (sortType) {
      case SortType.EVENT:
        this._container.querySelector(`.trip-days`).remove();
        this._tripSortItemDay.textContent = `Day`;
        this._renderTripEventsGroupedByDays(this._sortedTripEvents);
        break;
      default:
        this._container.querySelector(`.trip-days`).remove();
        this._tripSortItemDay.textContent = ``;
        this._renderTripEventsInEmptyDays(this._sortedTripEvents);
        break;
    }
  }
}
