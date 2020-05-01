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
  }

  renderTripEventsGroupedByDays() {
    this._renderTripEventsGroupedByDays = new TripEventsGroupedByDays(this._sortedTripEvents);
    render(this._container, this._renderTripEventsGroupedByDays);
  }

  renderTripEventsInEmptyDays() {
    this._renderTripEventsInEmptyDays = new TripEventsInEmptyDays(this._sortedTripEvents);
    render(this._container, this._renderTripEventsInEmptyDays);
  }

  render(tripEvents) {
    if (!tripEvents.length) {
      render(this._container, this._noTasksComponent);
      return;
    }

    this._sortedTripEvents = getSortedTripEvents(tripEvents);

    render(this._container, this._sortComponent);
    this.renderTripEventsGroupedByDays();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      this._sortedTripEvents = getSortedTripEvents(tripEvents, sortType);
      const tripSortItemDay = this._sortComponent.getElement().querySelector(`.trip-sort__item--day`);

      switch (sortType) {
        case SortType.TIME:
        case SortType.PRICE:
          this._container.querySelector(`.trip-days`).remove();
          tripSortItemDay.textContent = ``;
          this.renderTripEventsInEmptyDays(this._sortedTripEvents);
          break;
        default:
          this._container.querySelector(`.trip-days`).remove();
          tripSortItemDay.textContent = `Day`;
          this.renderTripEventsGroupedByDays();
          break;
      }
    });
  }
}
