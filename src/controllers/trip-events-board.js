import NoTripEventsComponent from '../components/page-main/trip-events/no-trip-events.js';
import TripDaysContainer from '../components/page-main/trip-days/trip-days-container.js';
import TripEventsGroupedByDaysView from '../components/page-main/trip-events/trip-events-grouped-by-days.js';
import TripEventsView from '../components/page-main/trip-events/trip-events.js';
import TripEventFormComponent from '../components/page-main/trip-event-form/trip-event-form.js';
import TripSortComponent from '../components/page-main/trip-sort/trip-sort.js';
import {SortType, FilterType, RenderPosition} from '../helpers/constants.js';
import {render} from '../helpers/render.js';
import {getSortedTripEvents} from '../helpers/utils.js';

export default class TripEventsBoardController {
  constructor(container, tripEventsModel, buttonAddNewEvent) {
    this._container = container;
    this._tripEventsModel = tripEventsModel;
    this._buttonAddNewEvent = buttonAddNewEvent;

    this._noTasksComponent = new NoTripEventsComponent();
    this._tripDaysContainer = new TripDaysContainer().getElement();
    this._sortComponent = new TripSortComponent();
    this._sortType = SortType.EVENT;

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._buttonAddNewEventClickHandler = this._buttonAddNewEventClickHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
    this._buttonAddNewEvent.setClickHandler(this._buttonAddNewEventClickHandler);
    this._tripEventsModel.setFilterChangeHandler(this._filterTypeChangeHandler);
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
    this._sortComponent.rerender();
    this.render();
  }

  _buttonAddNewEventClickHandler() {
    const newTripEventForm = new TripEventFormComponent(null);

    this._sortType = SortType.EVENT;
    this._tripEventsModel.setFilter(FilterType.EVERYTHING);

    this.render();
    render(this._sortComponent.getElement(), newTripEventForm, RenderPosition.AFTEREND);
  }

  _dataChangeHandler(tripEventController, oldTripEvent, updatedTripEvent) {
    if (oldTripEvent === null) {
      this._tripEventsModel.addTripEvent(updatedTripEvent);
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
