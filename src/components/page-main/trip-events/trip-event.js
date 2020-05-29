import moment from 'moment';
import AbstractComponent from '../../abstract-component.js';

export default class TripEvent extends AbstractComponent {
  constructor(tripEvent) {
    super();
    this._tripEvent = tripEvent;
  }

  getTemplate() {
    const {type, destination, basePrice, activeOffers, action, start, end, timeDiff} = this._tripEvent;
    const eventOffers = activeOffers ? this._renderOffers(activeOffers.slice(0, 3)) : ``;
    const startTime = moment(start).format(`HH:mm`);
    const endTime = moment(end).format(`HH:mm`);

    return (`<div class="event">
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event ${type.toLowerCase()} icon">
              </div>
              <h3 class="event__title">${type} ${action} ${destination.name}</h3>

              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="${start.toISOString()}">${startTime}</time>
                  &mdash;
                  <time class="event__end-time" datetime="${end.toISOString()}">${endTime}</time>
                </p>
                <p class="event__duration">${timeDiff}</p>
              </div>

              <p class="event__price">
                &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
              </p>

              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                ${eventOffers}
              </ul>

              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>`.trim()
    );
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }

  _renderOffers(activeOffers) {
    return activeOffers.map((activeOffer) => {
      const {title, price} = activeOffer;

      return (
        `<li class="event__offer">
          <span class="event__offer-title">${title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
        </li>`.trim()
      );
    })
    .join(`\n`);
  }
}
