import NoTripEventsComponent from '../components/page-main/trip-events/no-trip-events.js';
import TripDaysContainer from '../components/page-main/trip-days/trip-days-container.js';
import TripEventsGroupedByDays from '../components/page-main/trip-events/trip-events-grouped-by-days.js';
import TripEventsInEmptyDays from '../components/page-main/trip-events/trip-events-in-empty-days.js';
import TripSortComponent from '../components/page-main/trip-sort/trip-sort.js';
import {SortType} from '../helpers/constants.js';
import {render} from '../helpers/render.js';
import {getSortedTripEvents} from '../helpers/utils.js';

export default class TripEventsBoardController {
  constructor(container) {
    this._container = container;
    this._tripEvents = [];

    this._noTasksComponent = new NoTripEventsComponent();
    this._sortComponent = new TripSortComponent();
    this._tripDaysContainer = new TripDaysContainer().getElement();
    this._sortType = SortType.EVENT;

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

    this._renderTripEventsGroupedByDays();
    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }

  _renderTripEventsGroupedByDays() {
    const tripEventsGroupedByDays = new TripEventsGroupedByDays(this._tripDaysContainer, this._sortedTripEvents);
    render(this._container, tripEventsGroupedByDays);
  }

  _renderTripEventsInEmptyDays() {
    const tripEventsInEmptyDays = new TripEventsInEmptyDays(this._tripDaysContainer, this._sortedTripEvents);
    render(this._container, tripEventsInEmptyDays);
  }

  _renderSortedTripEvents() {
    this._tripSortItemDay = this._sortComponent.getElement().querySelector(`.trip-sort__item--day`);

    switch (this._sortType) {
      case SortType.EVENT:
        this._container.querySelector(`.trip-days`).innerHTML = ``;
        this._tripSortItemDay.textContent = `Day`;
        this._renderTripEventsGroupedByDays();
        break;
      default:
        this._container.querySelector(`.trip-days`).innerHTML = ``;
        this._tripSortItemDay.textContent = ``;
        this._renderTripEventsInEmptyDays();
        break;
    }
  }

  _sortTypeChangeHandler(sortType) {
    this._sortedTripEvents = getSortedTripEvents(this._sortedTripEvents, sortType);
    this._sortType = sortType;
    this._renderSortedTripEvents();
  }
}
