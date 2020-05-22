const SERVER_URL = `https://11.ecmascript.pages.academy/big-trip/`;
// const AUTH_KEY = `Basic y2StXBzjFLjS38cFEPo8wj4HcxPg7rjm`;

export default class API {
  getTripEvents() {
    return fetch(SERVER_URL, {});
  }
}
