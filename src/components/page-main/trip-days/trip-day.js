import AbstractComponent from '../../abstract-component.js';
import moment from 'moment';

const renderTripDay = (dayObject) => {
  const {date, counter} = dayObject;

  return `<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${counter}</span>
                <time class="day__date" datetime="${moment(date).toISOString()}">${moment(date).format(`MMM D`)}</time>
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
