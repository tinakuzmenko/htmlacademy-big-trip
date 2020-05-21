import NoTripEventsComponent from '../components/page-main/trip-events/no-trip-events.js';
import TripDaysContainer from '../components/page-main/trip-days/trip-days-container.js';
import TripEventsGroupedByDaysView from '../components/page-main/trip-events/trip-events-grouped-by-days.js';
import TripEventsView from '../components/page-main/trip-events/trip-events.js';
import TripSortComponent from '../components/page-main/trip-sort/trip-sort.js';
import {SortType, FilterType} from '../helpers/constants.js';
import {render} from '../helpers/render.js';
import {getSortedTripEvents} from '../helpers/utils.js';

export default class TripEventsBoardController {
  constructor(container, tripEventsModel) {
    this._containerComponent = container;
    this._tripEventsModel = tripEventsModel;

    this._container = this._containerComponent.getElement();
    this._noTasksComponent = new NoTripEventsComponent();
    this._tripDaysContainer = new TripDaysContainer().getElement();
    this._sortComponent = new TripSortComponent();
    this._sortType = SortType.EVENT;

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._creatingNewEventModeChangeHandler = this._creatingNewEventModeChangeHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
    this._tripEventsModel.setFilterChangeHandler(this._filterTypeChangeHandler);
    this._tripEventsModel.setModeChangeHandler(this._creatingNewEventModeChangeHandler);
  }

  hide() {
    this._containerComponent.hide();
    this._setDefaultBoardMode();
  }

  show() {
    this._containerComponent.show();
    this._sortComponent.rerender();
    this.render();
  }

  render() {
    const sortedTripEvents = getSortedTripEvents(this._tripEventsModel.getTripEvents(), this._sortType);
    this._clearTripEvents();

    if (!sortedTripEvents.length) {
      render(this._container, this._noTasksComponent);
      return;
    }

    render(this._container, this._sortComponent);

    this._tripSortItemDay = this._sortComponent.getElement().querySelector(`.trip-sort__item--day`);

    switch (this._sortType) {
      case SortType.TIME:
      case SortType.PRICE:
        this._tripSortItemDay.textContent = ``;
        this._tripEventsView = new TripEventsView(this._tripDaysContainer, sortedTripEvents, this._dataChangeHandler);
        render(this._container, this._tripEventsView);
        break;
      default:
        this._tripSortItemDay.textContent = `Day`;
        this._tripEventsView = new TripEventsGroupedByDaysView(this._tripDaysContainer, sortedTripEvents, this._dataChangeHandler, this._tripEventsModel);
        render(this._container, this._tripEventsView);
        break;
    }
  }

  _setDefaultBoardMode() {
    this._sortType = SortType.EVENT;
    this._tripEventsModel.setFilter(FilterType.EVERYTHING);
  }

  _clearTripEvents() {
    if (this._container.querySelector(`.trip-days`)) {
      this._container.querySelector(`.trip-days`).innerHTML = ``;
    }

    if (this._container.querySelector(`.trip-events__msg`)) {
      this._container.querySelector(`.trip-events__msg`).remove();
    }
  }

  _sortTypeChangeHandler(sortType) {
    this._sortType = sortType;
    this.render();
  }

  _filterTypeChangeHandler() {
    this._sortType = SortType.EVERYTHING;
    this._sortComponent.rerender();
    this.render();
  }

  _creatingNewEventModeChangeHandler() {
    if (!this._tripEventsModel.getIsCreatingMode()) {
      return;
    }

    this._setDefaultBoardMode();
    this._tripEventsView.createNewEventForm();
  }

  _dataChangeHandler(tripEventController, oldTripEvent, updatedTripEvent) {
    if (oldTripEvent === null) {
      this._tripEventsModel.addTripEvent(updatedTripEvent);
      this._tripEventsModel.setIsCreatingMode(false);
      this.render();
    } else if (updatedTripEvent === null) {
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
