export default class TripEvents {
  constructor() {
    this._tripEvents = [];

    this._dataChangeHandlers = [];
  }

  getTripEvents() {
    return this._tripEvents;
  }

  setTripEvents(tripEvents) {
    this._tripEvents = Array.from(tripEvents);
    this._callHandlers(this._dataChangeHandlers);
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

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
