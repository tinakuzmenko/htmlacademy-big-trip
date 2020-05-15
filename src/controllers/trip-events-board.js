import NoTripEventsComponent from '../components/page-main/trip-events/no-trip-events.js';
import TripDaysContainer from '../components/page-main/trip-days/trip-days-container.js';
import TripEventsGroupedByDaysView from '../components/page-main/trip-events/trip-events-grouped-by-days.js';
import TripEventsView from '../components/page-main/trip-events/trip-events.js';
import TripSortComponent from '../components/page-main/trip-sort/trip-sort.js';
import {SortType} from '../helpers/constants.js';
import {render} from '../helpers/render.js';
import {getSortedTripEvents} from '../helpers/utils.js';

export default class TripEventsBoardController {
  constructor(container, tripEventsModel) {
    this._container = container;
    this._tripEventsModel = tripEventsModel;

    this._noTasksComponent = new NoTripEventsComponent();
    this._tripDaysContainer = new TripDaysContainer().getElement();
    this._sortComponent = new TripSortComponent();
    this._sortType = SortType.EVENT;

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
    this._tripEventsModel.setFilterChangeHandler(this._filterTypeChangeHandler);
  }

  render() {
    const tripEvents = this._tripEventsModel.getTripEvents();
    this._clearTripEvents();

    if (!tripEvents.length) {
      render(this._container, this._noTasksComponent);
      return;
    }

    render(this._container, this._sortComponent);

    this._tripSortItemDay = this._sortComponent.getElement().querySelector(`.trip-sort__item--day`);

    const tripEventsGroupedByDays = new TripEventsGroupedByDaysView(this._tripDaysContainer, tripEvents, this._dataChangeHandler);

    render(this._container, tripEventsGroupedByDays);
  }

  _clearTripEvents() {
    if (this._container.querySelector(`.trip-days`)) {
      this._container.querySelector(`.trip-days`).innerHTML = ``;
    }
  }

  _sortTypeChangeHandler(sortType) {
    const sortedTripEvents = getSortedTripEvents(this._tripEventsModel.getTripEvents(), sortType);
    this._sortType = sortType;
    this._clearTripEvents();

    switch (sortType) {
      case SortType.TIME:
      case SortType.PRICE:
        this._tripSortItemDay.textContent = ``;
        const showedTripEvents = new TripEventsView(this._tripDaysContainer, sortedTripEvents, this._dataChangeHandler);
        render(this._container, showedTripEvents);
        break;
      default:
        this._tripSortItemDay.textContent = `Day`;
        const tripEventsGroupedByDays = new TripEventsGroupedByDaysView(this._tripDaysContainer, sortedTripEvents, this._dataChangeHandler);
        render(this._container, tripEventsGroupedByDays);
        break;
    }
  }

  _filterTypeChangeHandler() {
    this._sortComponent.rerender();
    this.render();
  }

  _dataChangeHandler(tripEventController, oldTripEvent, updatedTripEvent) {
    if (updatedTripEvent === null) {
      this._tripEventsModel.removeTripEvent(oldTripEvent.id);
      this.render();
    } else {
      const isSuccess = this._tripEventsModel.updateTripEvent(oldTripEvent.id, updatedTripEvent);

      if (isSuccess) {
        tripEventController.render(updatedTripEvent);
      }
    }
  }
}
