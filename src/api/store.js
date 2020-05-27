export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;
  }

  getTripEvents() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey)) || {};
    } catch (err) {
      return {};
    }
  }

  getDestinations() {
    try {
      return JSON.parse(this._storage.getItem(this._storeDestinationsKey)) || {};
    } catch (err) {
      return {};
    }
  }

  getOffers() {
    try {
      return JSON.parse(this._storage.getItem(this._storeOffersKey)) || {};
    } catch (err) {
      return {};
    }
  }

  setItem(key, value) {
    const store = this.getEvents();

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(
            Object.assign({}, store, {
              [key]: value
            })
        )
    );
  }

  setTripEvents(tripEvents) {
    this._storage.setItem(
        this._storeKey,
        JSON.stringify(tripEvents)
    );
  }

  setDestinations(destinations) {
    this._storage.setItem(this._storeDestinationsKey, JSON.stringify(destinations));
  }

  setOffers(offers) {
    this._storage.setItem(this._storeOffersKey, JSON.stringify(offers));
  }

  // removeItem(key) {

  // }
}
