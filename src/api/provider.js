import TripEvent from '../models/trip-event.js';

const isOnline = () => {
  return window.navigator.onLine;
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getTripEvents() {
    if (isOnline) {
      return this._api.getTripEvents()
        .then((tripEvents) => {
          tripEvents.forEach((tripEvent) => this._store.setItem(tripEvent.id, tripEvent.toRAW()));

          return tripEvents;
        });
    }

    const storeTripEvents = Object.values(this._store.getItems());
    return Promise.resolve(TripEvent.parseTasks(storeTripEvents));
  }

  getOffers() {
    if (isOnline) {
      return this._api.getOffers();
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  getDestinations() {
    if (isOnline) {
      return this._api.getDestinations();
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  getData() {
    if (isOnline) {
      return this._api.getData()
        .then((response) => {
          this._store.setOffers(response.offers);
          this._store.setDestinations(response.destinations);
          this._store.setTripEvents(response.tripEvents);

          return response;
        });
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  createTripEvent(tripEvent) {
    if (isOnline) {
      return this._api.createTripEvent(tripEvent);
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  updateTripEvent(id, tripEvent) {
    if (isOnline) {
      return this._api.updateTripEvent(id, tripEvent);
      // .then((updatedTripEvent) => {
      //   console.log(updatedTripEvent);
      //   this._store.setItem(updatedTripEvent.id, updatedTripEvent);

      //   return updatedTripEvent;
      // });
    }

    const localTripEvent = TripEvent.clone(Object.assign(tripEvent, {id}));

    this._store.setItem(id, localTripEvent.toRAW());

    return Promise.resolve(localTripEvent);
  }

  deleteTripEvent(id) {
    if (isOnline) {
      return this._api.deleteTripEvent(id);
    }

    return Promise.reject(`offline logic is not implemented`);
  }
}
