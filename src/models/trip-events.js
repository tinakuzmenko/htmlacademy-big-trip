import {getTripEventsByFilter} from '../helpers/filter.js';
import {FilterType} from "../helpers/constants.js";

export default class TripEvents {
  constructor() {
    this._tripEvents = [];
    this._activeFilterType = FilterType.EVERYTHING;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getTripEvents() {
    return getTripEventsByFilter(this._tripEvents, this._activeFilterType);
  }

  getAllTripEvents() {
    return this._tripEvents;
  }

  setTripEvents(tripEvents) {
    this._tripEvents = Array.from(tripEvents);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  getFilter() {
    return this._activeFilterType;
  }

  removeTripEvent(id) {
    const index = this._tripEvents.findIndex((tripEvent) => tripEvent.id === id);

    if (index === -1) {
      return false;
    }

    this._tripEvents = [].concat(this._tripEvents.slice(0, index), this._tripEvents.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }


  updateTripEvent(id, tripEvent) {
    const index = this._tripEvents.findIndex((tripEventItem) => tripEventItem.id === id);

    if (index === -1) {
      return false;
    }

    this._tripEvents = [].concat(this._tripEvents.slice(0, index), tripEvent, this._tripEvents.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  addTripEvent(tripEvent) {
    this._tripEvents = [].concat(tripEvent, this._tripEvents);
    this._callHandlers(this._dataChangeHandlers);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
