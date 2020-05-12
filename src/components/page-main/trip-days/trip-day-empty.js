import AbstractComponent from '../../abstract-component.js';

const renderEmptyTripDay = () => {
  return `<li class="trip-days__item  day">
              <div class="day__info">
              </div>
          </li>`;
};

export default class EmptyTripDay extends AbstractComponent {
  getTemplate() {
    return renderEmptyTripDay();
  }
}
