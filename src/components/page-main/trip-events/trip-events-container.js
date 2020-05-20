import AbstractComponent from '../../abstract-component.js';

export default class TripEventsContainer extends AbstractComponent {
  getTemplate() {
    return `<ul class="trip-events__list"></ul>`;
  }
}
