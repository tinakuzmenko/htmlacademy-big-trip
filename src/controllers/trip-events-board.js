import NoTripEventsComponent from '../components/page-main/trip-events/no-trip-events.js';
import TripEventWrapperComponent from '../components/page-main/trip-events/trip-event-wrapper.js';
import TripEventsGroupedByDays from '../components/page-main/trip-events/trip-events-grouped-by-days.js';
import TripEventsInEmptyDays from '../components/page-main/trip-events/trip-events-in-empty-days.js';
import TripSortComponent from '../components/page-main/trip-sort/trip-sort.js';
import TripEventController from '../controllers/trip-event.js';
import {SortType} from '../helpers/constants.js';
import {render} from '../helpers/render.js';
import {getSortedTripEvents} from '../helpers/utils.js';

export default class TripEventsBoardController {
  constructor(container) {
    this._container = container;
    this._tripEvents = [];

    this._noTasksComponent = new NoTripEventsComponent();
    this._sortComponent = new TripSortComponent();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._dataChangeHandler = this._dataChangeHandler.bind(this);
  }

  render(tripEvents) {
    this._tripEvents = tripEvents;

    if (!this._tripEvents.length) {
      render(this._container, this._noTasksComponent);
      return;
    }

    this._sortedTripEvents = getSortedTripEvents(this._tripEvents);
    this._renderTripEvents();

    render(this._container, this._sortComponent);

    this._renderTripEventsGroupedByDays();
    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }

  _renderTripEvents() {
    this._renderedTripEvents = this._sortedTripEvents.map((tripEvent) => {
      const tripEventWrapper = new TripEventWrapperComponent().getElement();
      const tripEventController = new TripEventController(tripEventWrapper, tripEvent, this._dataChangeHandler);

      return tripEventController;
    });
  }

  _renderTripEventsGroupedByDays() {
    const tripEventsGroupedByDays = new TripEventsGroupedByDays(this._renderedTripEvents);
    render(this._container, tripEventsGroupedByDays);
  }

  _renderTripEventsInEmptyDays() {
    const tripEventsInEmptyDays = new TripEventsInEmptyDays(this._renderedTripEvents);
    render(this._container, tripEventsInEmptyDays);
  }

  _sortTypeChangeHandler(sortType) {
    this._sortedTripEvents = getSortedTripEvents(this._tripEvents, sortType);
    this._tripSortItemDay = this._sortComponent.getElement().querySelector(`.trip-sort__item--day`);
    this._renderTripEvents();

    switch (sortType) {
      case SortType.EVENT:
        this._container.querySelector(`.trip-days`).remove();
        this._tripSortItemDay.textContent = `Day`;
        this._renderTripEventsGroupedByDays();
        break;
      default:
        this._container.querySelector(`.trip-days`).remove();
        this._tripSortItemDay.textContent = ``;
        this._renderTripEventsInEmptyDays();
        break;
    }
  }

  _dataChangeHandler(oldTripEvent, updatedTripEvent) {
    const index = this._tripEvents.findIndex((tripEvent) => tripEvent === oldTripEvent);

    if (index === -1) {
      return;
    }

    this._tripEvents = [].concat(this._tripEvents.slice(0, index), updatedTripEvent, this._tripEvents.slice(index + 1));

    const tripEventWrapper = new TripEventWrapperComponent().getElement();
    this._renderedTripEvents[index] = new TripEventController(tripEventWrapper, this._tripEvents[index], this._dataChangeHandler);
  }
}
