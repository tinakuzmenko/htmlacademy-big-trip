import AbstractComponent from '../../abstract-component.js';

const renderTripEventWrapper = () => {
  return `<li class="trip-events__item"></li>`;
};

export default class TripEventWrapper extends AbstractComponent {
  getTemplate() {
    return renderTripEventWrapper();
  }
}
