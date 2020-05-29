import TripEvent from '../models/trip-event.js';
import {nanoid} from "nanoid";

const isOnline = () => {
  return window.navigator.onLine;
};

const getSyncedTripEvents = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.point);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store, tripEventsModel) {
    this._api = api;
    this._store = store;
    this._tripEventsModel = tripEventsModel;
  }

  getTripEvents() {
    if (isOnline()) {
      return this._api.getTripEvents()
        .then((tripEvents) => {
          const storedTripEvents = createStoreStructure(tripEvents);
          this._store.setItems(storedTripEvents);

          return tripEvents;
        });
    }

    const storeTripEvents = Object.values(this._store.getTripEvents());
    return Promise.resolve(TripEvent.parseTripEvents(storeTripEvents));
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          this._store.setItems(offers);
          return offers;
        });
    }

    const storeOffers = Object.values(this._store.getOffers());
    return Promise.resolve(storeOffers);
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          this._store.setItems(destinations);
          return destinations;
        });
    }

    const storeDestinations = Object.values(this._store.getDestinations());
    return Promise.resolve(storeDestinations);
  }

  getData() {
    if (isOnline()) {
      return this._api.getData()
        .then((response) => {
          const tripEvents = createStoreStructure(response.tripEvents.map((tripEvent) => this._prepareData(tripEvent)));

          this._store.setOffers(response.offers);
          this._store.setDestinations(response.destinations);
          this._store.setItems(tripEvents);

          return response;
        });
    }

    return Promise.resolve(Object.assign({},
        {tripEvents: this._store.getTripEvents()},
        {destinations: this._store.getDestinations()},
        {offers: this._store.getOffers()}));
  }

  createTripEvent(tripEvent) {
    if (isOnline()) {
      return this._api.createTripEvent(this._prepareData(tripEvent))
        .then((newTripEvent) => {
          this._store.setItem(newTripEvent.id, newTripEvent);

          return newTripEvent;
        });
    }

    const localNewTripEventId = nanoid();
    const localNewTripEvent = Object.assign(tripEvent, {id: localNewTripEventId});

    this._store.setItem(localNewTripEvent.id, this._prepareData(localNewTripEvent));
    return Promise.resolve(localNewTripEvent);
  }

  updateTripEvent(id, tripEvent) {
    if (isOnline()) {
      return this._api.updateTripEvent(id, this._prepareData(tripEvent))
      .then((updatedTripEvent) => {
        this._store.setItem(updatedTripEvent.id, updatedTripEvent);

        return updatedTripEvent;
      });
    }

    const localTripEvent = Object.assign(tripEvent, {id});
    this._store.setItem(id, this._prepareData(localTripEvent));

    return Promise.resolve(localTripEvent);
  }

  deleteTripEvent(id) {
    if (isOnline()) {
      return this._api.deleteTripEvent(id)
        .then(() => this._store.removeItem(id));
    }

    this._store.removeItem(id);

    return Promise.resolve();
  }

  sync() {
    if (isOnline()) {
      const storeTripEvents = Object.values(this._store.getTripEvents());

      return this._api.sync(storeTripEvents)
        .then((response) => {
          const createdTripEvents = response.created;
          const updatedTripEvents = getSyncedTripEvents(response.updated);

          const items = createStoreStructure([...createdTripEvents, ...updatedTripEvents]);

          this._store.setItems(items);

          const syncedItems = TripEvent.parseTripEvents(Object.values(items));
          this._tripEventsModel.setTripEvents(syncedItems);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  _prepareData(tripEvent) {
    const tripEventAdapter = new TripEvent(tripEvent);
    const tripEventRAW = tripEventAdapter.toRAW(tripEvent);
    return tripEventRAW;
  }
}
