import {createElement} from '../../../helpers/utils.js';

const renderTripDaysContainer = () => {
  return `<ul class="trip-days"></ul>`;
};

export default class TripDaysContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return renderTripDaysContainer();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
