import {eventDestinations, eventTypes} from '../../../mocks/trip-event-mocks.js';
import AbstractComponent from '../../abstract-component.js';
import {getDateAndTimeFormFormat} from './get-date-and-time-form-format.js';

const renderEventOffers = (offers) => {
  return offers.map((offer, index) => {
    const {id, title, price} = offer;
    const isChecked = Math.random() > 0.5;

    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-${index + 1}" type="checkbox" name="event-offer-${id}"
        ${isChecked ? `checked` : ``}
        >
        <label class="event__offer-label" for="event-offer-${id}-${index + 1}">
          <span class="event__offer-title">${title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
        </label>
      </div>`.trim()
    );
  })
  .join(``);
};

const renderOffers = (offers) => {
  const eventOffers = renderEventOffers(offers);
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${eventOffers}
      </div>
    </section>`.trim()
  );
};

const renderOptions = (cities) => {
  return cities.map((city) => {
    return (`<option value="${city}"></option>`.trim());
  })
  .join(`\n`);
};

const renderTripTypesList = (types) => {
  return types.map((type, id) => {
    return (
      `<div class="event__type-item">
        <input id="event-type-${type.toLowerCase()}-${id + 1}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
        <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-${id + 1}">${type}</label>
      </div>`.trim()
    );
  })
  .join(`\n`);
};

const renderPhotos = (photos) => {
  return photos.map((photo) => {
    return (
      `<img class="event__photo" src="${photo}" alt="Event photo">`.trim());
  })
  .join(`\n`);
};

const renderTripEventForm = (tripEvent, id) => {
  const {type, city, description, action, offers, photos, start, end, basePrice} = tripEvent;
  const isFavorite = Math.random() > 0.5;

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
              <button class="event__reset-btn" type="reset">Delete</button>

              <input id="event-favorite-${id}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
              <label class="event__favorite-btn" for="event-favorite-${id}">
                <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                </svg>
              </label>

              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
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

export default class TripEventForm extends AbstractComponent {
  constructor(tripEvent, id) {
    super();
    this._tripEvent = tripEvent;
    this._id = id;
  }

  getTemplate() {
    return renderTripEventForm(this._tripEvent, this._id);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
  }

  setButtonRollUpHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
