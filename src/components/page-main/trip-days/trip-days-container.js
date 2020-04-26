import AbstractComponent from '../../abstract-component.js';

const renderTripDaysContainer = () => {
  return `<ul class="trip-days"></ul>`;
};

export default class TripDaysContainer extends AbstractComponent {
  getTemplate() {
    return renderTripDaysContainer();
  }
}
