import AbstractComponent from '../../abstract-component.js';

export default class TripEventWrapper extends AbstractComponent {
  getTemplate() {
    return `<li class="trip-events__item"></li>`;
  }
}
