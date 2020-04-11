import {renderTripEventOffers} from './render-trip-event-offers.js';
import {getTimeFormat} from './get-time-format.js';

const renderTripEvent = (tripEvent) => {
  const {type, city, basePrice, offers, action, start, end, timeDiff} = tripEvent;
  const eventOffers = offers !== null ? renderTripEventOffers(offers) : ``;
  const startTime = getTimeFormat(start);
  const endTime = getTimeFormat(end);

  return `<li class="trip-events__item">
            <div class="event">
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event ${type} icon">
              </div>
              <h3 class="event__title">${type} ${action} ${city}</h3>

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
            </div>
          </li>`;
};

export {renderTripEvent};
