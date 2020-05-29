import AbstractComponent from '../../abstract-component.js';

export default class TripDayEmpty extends AbstractComponent {
  getTemplate() {
    return `<li class="trip-days__item  day">
                <div class="day__info">
                </div>
            </li>`;
  }
}
