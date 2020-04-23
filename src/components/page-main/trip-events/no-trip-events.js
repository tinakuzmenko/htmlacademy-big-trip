import {createElement} from "../../../helpers/utils.js";

const createNoTripEventsTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`.trim()
  );
};


export default class NoTripEvents {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoTripEventsTemplate();
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
