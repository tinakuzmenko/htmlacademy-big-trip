import AbstractComponent from '../../abstract-component.js';

const renderTripEventsContainer = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class TripEventsContainer extends AbstractComponent {
  getTemplate() {
    return renderTripEventsContainer();
  }
}
