import {eventDestinations, eventOffers, eventTypes} from '../../../mocks/trip-event-mocks.js';
import AbstractSmartComponent from '../../abstract-smart-component.js';
import {eventActionsMap} from '../../../helpers/constants.js';
import {getDateAndTimeFormFormat} from './get-date-and-time-form-format.js';

const checkIsOfferChecked = (offer, activeOffers) => {
  let isChecked = false;

  activeOffers.forEach((activeOffer) => {
    if (offer.title === activeOffer.title) {
      isChecked = true;
    }
  });

  return isChecked;
};

const renderEventOffers = (offers, activeOffers, id) => {
  return offers.map((offer, index) => {
    const {title, price} = offer;
    const isChecked = checkIsOfferChecked(offer, activeOffers);

    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offers}-${index + 1}" type="checkbox" name="event-offer-${id}"
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

const renderOffers = (offers, activeOffers, id) => {
  const tripEventOffers = renderEventOffers(offers, activeOffers, id);
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${tripEventOffers}
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

const renderTripEventForm = (tripEvent) => {
  const {type, destination, action, offers, activeOffers, start, end, basePrice, isFavorite, id} = tripEvent;

  const typesTransferList = renderTripTypesList(eventTypes.slice(0, 7));
  const typesActivitiesList = renderTripTypesList(eventTypes.slice(7, 10));
  const eventOptions = renderOptions(eventDestinations);
  const eventPhotos = renderPhotos(destination.photos);

  const startTime = getDateAndTimeFormFormat(start);
  const endTime = getDateAndTimeFormFormat(end);
  const tripEventOffers = offers ? renderOffers(offers, activeOffers, id) : ``;

  return (`<form class="trip-events__item event event--edit" action="#" method="post">
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
                <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${id}">
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
              ${tripEventOffers}
              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${destination.description}</p>

                <div class="event__photos-container">
                  <div class="event__photos-tape">
                    ${eventPhotos}
                  </div>
                </div>
              </section>
            </section>
          </form>`);
};

export default class TripEventForm extends AbstractSmartComponent {
  constructor(tripEvent) {
    super();
    this._tripEvent = tripEvent;
    this._id = this._tripEvent.id;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return renderTripEventForm(this._tripEvent, this._id);
  }

  recoveryListeners() {
    this.setSubmitHandler(this._tripEventFormComponentSubmitHandler);
    this.setButtonRollUpHandler(this._tripEventFormComponentRollUpHandler);
    this.setFavoritesButtonClickHandler(this._tripEventFormComponentFavoritesButtonClickHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._tripEventFormComponentSubmitHandler = handler;
  }

  setButtonRollUpHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
    this._tripEventFormComponentRollUpHandler = handler;
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`change`, handler);
    this._tripEventFormComponentFavoritesButtonClickHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const typeListElement = element.querySelector(`.event__type-list`);
    const destinationInputElement = element.querySelector(`.event__input--destination`);
    const saveButtonElement = element.querySelector(`.event__save-btn`);

    typeListElement.addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `LABEL`) {
        const inputTypeListElement = typeListElement.querySelector(`#` + evt.target.htmlFor);

        this._tripEvent.type = inputTypeListElement.value;
        this._tripEvent.action = eventActionsMap[this._tripEvent.type];
        this._tripEvent.offers = eventOffers[this._tripEvent.type.toLowerCase()];
      }

      this.rerender();
    });

    destinationInputElement.addEventListener(`click`, () => {
      destinationInputElement.value = ``;
      saveButtonElement.disabled = true;
    });

    destinationInputElement.addEventListener(`input`, () => {
      this._tripEvent.destination.name = destinationInputElement.value;

      const isInOptions = eventDestinations.find((destination) => destination === this._tripEvent.destination.name);

      if (!isInOptions) {
        return;
      }

      saveButtonElement.disabled = false;
      this._tripEvent.destination.name = this._tripEvent.destination.name;

      this.rerender();
    });
  }
}
