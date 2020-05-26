import {getTripEventsByFilter} from '../helpers/utils.js';
import {FilterType} from "../helpers/constants.js";

export default class TripEvents {
  constructor() {
    this._tripEvents = [];
    this._activeFilterType = FilterType.EVERYTHING;
    this._isCreatingMode = false;
    this._isButtonNewEventEnabled = true;

    this._modeChangeHandlers = [];
    this._isButtonNewEventEnabledHandlers = [];
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getTripEvents() {
    return getTripEventsByFilter(this._tripEvents, this._activeFilterType);
  }

  getAllTripEvents() {
    return this._tripEvents;
  }

  getOffers() {
    return this._offers;
  }

  getDestinations() {
    return this._destinations;
  }

  getFilter() {
    return this._activeFilterType;
  }

  getIsCreatingMode() {
    return this._isCreatingMode;
  }

  getIsButtonNewEventEnabled() {
    return this._isButtonNewEventEnabled;
  }

  setTripEvents(tripEvents) {
    this._tripEvents = Array.from(tripEvents);
    this._callHandlers(this._dataChangeHandlers);
  }

  setIsButtonNewEventEnabled(isEnabled) {
    this._isButtonNewEventEnabled = isEnabled;
    this._callHandlers(this._isButtonNewEventEnabledHandlers);
  }

  setOffers(offers) {
    this._offers = offers;
  }

  setDestinations(destinations) {
    this._destinations = destinations;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setIsCreatingMode(mode = false) {
    this._isCreatingMode = mode;
    this._isButtonNewEventEnabled = !this._isCreatingMode;
    this._callHandlers(this._modeChangeHandlers);
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

  setModeChangeHandler(handler) {
    this._modeChangeHandlers.push(handler);
  }

  setIsButtonNewEventEnabledHandler(handler) {
    this._isButtonNewEventEnabledHandlers.push(handler);
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
