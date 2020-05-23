import {ServerUrl} from './helpers/constants.js';
import TripEventAdapter from './models/trip-event.js';

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
      url: ServerUrl.POINTS,
      method: `GET`,
    })
      .then((response) => response.json())
      .then(TripEventAdapter.parseTripEvents);
  }

  getOffers() {
    return this._loadData({
      url: ServerUrl.OFFERS,
      method: `GET`,
    })
      .then((response) => response.json());
  }

  getDestinations() {
    return this._loadData({
      url: ServerUrl.DESTINATIONS,
      method: `GET`,
    })
      .then((response) => response.json());
  }

  _loadData({url, method, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(url, {method, headers})
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
      })
      .catch((error) => {
        throw error;
      });
  }
}
