import {eventTypes, eventDestinations} from '../../../mocks/trip-event-mocks.js';
import {getDateAndTimeFormFormat} from './get-date-and-time-form-format.js';
import {renderOffers} from './render-offers.js';
import {renderOptions} from './render-options.js';
import {renderPhotos} from './photos.js';
import {renderTripTypesList} from './render-trip-types-list.js';

const renderTripEventForm = (tripEvent, id) => {
  const {type, city, description, action, offers, photos, start, end, basePrice} = tripEvent;

  const typesTransferList = renderTripTypesList(eventTypes.slice(0, 7));
  const typesActivitiesList = renderTripTypesList(eventTypes.slice(7, 10));
  const eventOptions = renderOptions(eventDestinations);
  const eventPhotos = renderPhotos(photos);

  const startTime = getDateAndTimeFormFormat(start);
  const endTime = getDateAndTimeFormFormat(end);

  const eventOffers = offers !== null ? renderOffers(offers) : ``;

  return (`<form class="trip-events__item  event  event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event ${type.toLowerCase()} icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Transfer</legend>

                    <div class="event__type-item">
                      ${typesTransferList}
                    </div>
                  </fieldset>

                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Activity</legend>

                    <div class="event__type-item">
                      ${typesActivitiesList}
                    </div>
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-${id}">
                  ${type} ${action}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${city}" list="destination-list-${id}">
                <datalist id="destination-list-${id}">
                  ${eventOptions}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-${id}">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${startTime}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-${id}">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${endTime}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-${id}">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>
            </header>

            <section class="event__details">
              ${eventOffers}
              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${description}</p>

                <div class="event__photos-container">
                  <div class="event__photos-tape">
                    ${eventPhotos}
                  </div>
                </div>
              </section>
            </section>
          </form>`);
};

export {renderTripEventForm};
