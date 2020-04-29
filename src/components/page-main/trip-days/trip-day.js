import {MONTHS, SortType} from '../../../helpers/constants.js';
import AbstractComponent from '../../abstract-component.js';

const renderTripDayInfo = (counter, dateValue, monthValue, yearValue) => {
  return (
    `<span class="day__counter">${counter}</span>
    <time class="day__date" datetime="${yearValue}-${monthValue + 1}-${dateValue}">${MONTHS[monthValue]} ${dateValue}</time>`
  ).trim();
};

const renderTripDay = (dayObject, sortType) => {
  const {date, counter} = dayObject;

  const dateString = new Date(date);

  const dateValue = dateString.getDate();
  const monthValue = dateString.getMonth();
  const yearValue = dateString.getFullYear();

  const tripDayInfo = sortType === SortType.EVENT ? renderTripDayInfo(counter, dateValue, monthValue, yearValue) : ``;

  return `<li class="trip-days__item  day">
              <div class="day__info">
                ${tripDayInfo}
              </div>
          </li>`;
};

export default class TripDay extends AbstractComponent {
  constructor(day, sortType) {
    super();
    this._day = day;
    this._sortType = sortType;
  }

  getTemplate() {
    return renderTripDay(this._day, this._sortType);
  }
}
