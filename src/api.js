import TripEventAdapter from './models/trip-event.js';

export default class API {
  constructor(authorization, serverURL) {
    this._authorization = authorization;
    this._SERVER_URL = serverURL;
  }

  getTripEvents() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(this._SERVER_URL, {headers})
      .then((response) => response.json())
      .then(TripEventAdapter.parseTripEvents);
  }
}
