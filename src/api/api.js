import TripEventAdapter from '../models/trip-event.js';

const ServerUrl = {
  POINTS: `https://11.ecmascript.pages.academy/big-trip/points`,
  OFFERS: `https://11.ecmascript.pages.academy/big-trip/offers`,
  DESTINATIONS: `https://11.ecmascript.pages.academy/big-trip/destinations`,
  SYNC: `https://11.ecmascript.pages.academy/big-trip/points/sync`
};

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`,
};

export default class API {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getData() {
    return Promise.all([
      this.getTripEvents(),
      this.getOffers(),
      this.getDestinations(),
    ])
      .then((response) => {
        const [tripEvents, offers, destinations] = response;
        return {
          tripEvents,
          offers,
          destinations,
        };
      });
  }

  getTripEvents() {
    return this._loadData({
      url: ServerUrl.POINTS
    })
      .then((response) => response.json())
      .then(TripEventAdapter.parseTripEvents);
  }

  getOffers() {
    return this._loadData({
      url: ServerUrl.OFFERS
    })
      .then((response) => response.json());
  }

  getDestinations() {
    return this._loadData({
      url: ServerUrl.DESTINATIONS
    })
      .then((response) => response.json());
  }

  createTripEvent(newTripEvent) {
    return this._loadData({
      url: ServerUrl.POINTS,
      method: Method.POST,
      body: JSON.stringify(newTripEvent),
    })
      .then((response) => response.json())
      .then(TripEventAdapter.parseTripEvent);
  }

  updateTripEvent(id, updatedTripEvent) {
    return this._loadData({
      url: `${ServerUrl.POINTS}/${id}`,
      method: Method.PUT,
      body: JSON.stringify(updatedTripEvent),
    })
    .then(this._checkStatus)
    .then((response) => response.json())
    .then(TripEventAdapter.parseTripEvent);
  }

  deleteTripEvent(id) {
    return this._loadData({
      url: `${ServerUrl.POINTS}/${id}`,
      method: Method.DELETE,
    });
  }

  sync(localData) {
    return this._loadData({
      url: `${ServerUrl.SYNC}`,
      method: Method.POST,
      body: JSON.stringify(localData),
    })
      .then((response) => response.json());
  }

  _loadData({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(url, {method, body, headers})
      .then(this._checkStatus)
      .catch((error) => {
        throw error;
      });
  }

  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }
}
