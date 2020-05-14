import NoTripEventsComponent from '../components/page-main/trip-events/no-trip-events.js';
import TripDaysContainer from '../components/page-main/trip-days/trip-days-container.js';
import TripEventsGroupedByDays from '../components/page-main/trip-events/trip-events-grouped-by-days.js';
import TripEvents from '../components/page-main/trip-events/trip-events.js';
import TripSortComponent from '../components/page-main/trip-sort/trip-sort.js';
import {SortType} from '../helpers/constants.js';
import {render} from '../helpers/render.js';
import {getSortedTripEvents} from '../helpers/utils.js';

export default class TripEventsBoardController {
  constructor(container, tripEventsModel) {
    this._container = container;
    this._tripEventsModel = tripEventsModel;
    this._tripEvents = this._tripEventsModel.getTripEvents();

    this._noTasksComponent = new NoTripEventsComponent();
    this._sortComponent = new TripSortComponent();
    this._tripDaysContainer = new TripDaysContainer().getElement();
    this._sortType = SortType.EVENT;

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  render() {
    if (!this._tripEvents.length) {
      render(this._container, this._noTasksComponent);
      return;
    }

    render(this._container, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);

    this._tripSortItemDay = this._sortComponent.getElement().querySelector(`.trip-sort__item--day`);

    if (this._container.querySelector(`.trip-days`)) {
      this._container.querySelector(`.trip-days`).innerHTML = ``;

      const flatpickers = document.querySelectorAll(`.flatpickr-calendar`);
      flatpickers.forEach((flatpicker) => flatpicker.remove());
    }

    switch (this._sortType) {
      case SortType.TIME:
      case SortType.PRICE:
        this._tripSortItemDay.textContent = ``;

        const showedTripEvents = new TripEvents(this._tripDaysContainer, this._tripEvents, this._dataChangeHandler);

        render(this._container, showedTripEvents);
        break;
      default:
        this._tripSortItemDay.textContent = `Day`;

        const tripEventsGroupedByDays = new TripEventsGroupedByDays(this._tripDaysContainer, this._tripEvents, this._dataChangeHandler);

        render(this._container, tripEventsGroupedByDays);
        break;
    }
  }

  _sortTypeChangeHandler(sortType) {
    this._tripEvents = getSortedTripEvents(this._tripEvents, sortType);
    this._sortType = sortType;
    this.render(this._tripEvents);
  }

  _dataChangeHandler(tripEventController, oldTripEvent, updatedTripEvent) {
    const isSuccess = this._tripEventsModel.updateTripEvent(oldTripEvent.id, updatedTripEvent);

    if (isSuccess) {
      tripEventController.render(updatedTripEvent);
    }
  }
}
