import {SortType} from '../../../helpers/constants.js';
import AbstractSmartComponent from '../../abstract-smart-component.js';

export default class TripSort extends AbstractSmartComponent {
  constructor() {
    super();

    this._currentSortType = SortType.EVENT;
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    this.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }

  getTemplate() {
    return this._renderTripSort();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `LABEL`) {
        return;
      }

      const sortType = evt.target.htmlFor;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });

    this._sortTypeChangeHandler = handler;
  }

  _renderTripSort() {
    return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
              <span class="trip-sort__item  trip-sort__item--day">Day</span>

              <div class="trip-sort__item  trip-sort__item--event">
                <input id="${SortType.EVENT}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" checked>
                <label class="trip-sort__btn" for="${SortType.EVENT}">Event</label>
              </div>

              <div class="trip-sort__item  trip-sort__item--time">
                <input id="${SortType.TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
                <label class="trip-sort__btn" for="${SortType.TIME}">
                  Time
                  <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
                    <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
                  </svg>
                </label>
              </div>

              <div class="trip-sort__item  trip-sort__item--price">
                <input id="${SortType.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
                <label class="trip-sort__btn" for="${SortType.PRICE}">
                  Price
                  <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
                    <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
                  </svg>
                </label>
              </div>

              <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
            </form>`.trim();
  }
}
