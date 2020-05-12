import {MONTHS} from '../../../helpers/constants.js';
import AbstractComponent from '../../abstract-component.js';


const renderTripDay = (dayObject) => {
  const {date, counter} = dayObject;

  const dateString = new Date(date);

  const dateValue = dateString.getDate();
  const monthValue = dateString.getMonth();
  const yearValue = dateString.getFullYear();

  return `<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${counter}</span>
                <time class="day__date" datetime="${yearValue}-${monthValue + 1}-${dateValue}">${MONTHS[monthValue]} ${dateValue}</time>
              </div>
          </li>`;
};

export default class TripDay extends AbstractComponent {
  constructor(day) {
    super();
    this._day = day;
  }

  getTemplate() {
    return renderTripDay(this._day);
  }
}
