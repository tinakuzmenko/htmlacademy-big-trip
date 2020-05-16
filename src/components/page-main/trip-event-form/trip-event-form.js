import {eventDestinations, eventOffers, eventTypes, eventDestinationsObjects} from '../../../mocks/trip-event-mocks.js';
import AbstractSmartComponent from '../../abstract-smart-component.js';
import {eventActionsMap, Mode} from '../../../helpers/constants.js';
import {getDateAndTimeFormFormat} from './get-date-and-time-form-format.js';
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

export default class TripEventForm extends AbstractSmartComponent {
  constructor(tripEvent) {
    super();
    this._tripEvent = tripEvent;
    this._flatpickrFrom = null;
    this._flatpickrTo = null;

    this._tripEventFormMode = this._tripEvent ? Mode.EDIT : Mode.DEFAULT;

    this._tripEventId = this._tripEvent && this._tripEvent.id ? this._tripEvent.id : ``;
    this._tripEventType = this._tripEvent && this._tripEvent.type ? this._tripEvent.type : `Taxi`;
    this._tripEventDestination = this._tripEvent && this._tripEvent.destination ? this._tripEvent.destination : {
      name: ``,
      description: ``,
      photos: []
    };
    this._tripEventAction = this._tripEvent && this._tripEvent.action ? this._tripEvent.action : `to`;
    this._tripEventOffers = this._tripEvent && this._tripEvent.offers ? this._tripEvent.offers : [];
    this._tripEventActiveOffers = this._tripEvent && this._tripEvent.activeOffers ? this._tripEvent.activeOffers : [];
    this._tripEventStartTime = this._tripEvent ? getDateAndTimeFormFormat(this._tripEvent.start) : getDateAndTimeFormFormat(new Date());
    this._tripEventEndTime = this._tripEvent ? getDateAndTimeFormFormat(this._tripEvent.end) : getDateAndTimeFormFormat(new Date());
    this._tripEventBasePrice = this._tripEvent && this._tripEvent.basePrice ? this._tripEvent.basePrice : ``;
    this._tripEventIsFavorite = this._tripEvent && this._tripEvent.isFavorite ? this._tripEvent.isFavorite : false;

    this._typesTransferList = this._renderTripTypesList(eventTypes.slice(0, 7));
    this._typesActivitiesList = this._renderTripTypesList(eventTypes.slice(7, 10));
    this._tripEventOptions = this._renderOptions(eventDestinations);
    this._tripEventPhotos = this._tripEvent && this._renderPhotos(this._tripEventDestination.photos);

    // this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    const renderedOffersSection = this._renderOffersSection(this._tripEventOffers, this._tripEventActiveOffers, this._tripEventId);

    return (`<form class="trip-events__item event event--edit" action="#" method="post">
              <header class="event__header">
                <div class="event__type-wrapper">
                  <label class="event__type  event__type-btn" for="event-type-toggle-${this._tripEventId}">
                    <span class="visually-hidden">Choose event type</span>
                    <img class="event__type-icon" width="17" height="17" src="img/icons/${this._tripEventType.toLowerCase()}.png" alt="Event ${this._tripEventType.toLowerCase()} icon">
                  </label>
                  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${this._tripEventId}" type="checkbox">

                  <div class="event__type-list">
                    <fieldset class="event__type-group">
                      <legend class="visually-hidden">Transfer</legend>

                      <div class="event__type-item">
                        ${this._typesTransferList}
                      </div>
                    </fieldset>

                    <fieldset class="event__type-group">
                      <legend class="visually-hidden">Activity</legend>

                      <div class="event__type-item">
                        ${this._typesActivitiesList}
                      </div>
                    </fieldset>
                  </div>
                </div>

                <div class="event__field-group  event__field-group--destination">
                  <label class="event__label  event__type-output" for="event-destination-${this._tripEventId}">
                    ${this._tripEventType} ${this._tripEventAction}
                  </label>
                  <input class="event__input  event__input--destination" id="event-destination-${this._tripEventId}" type="text" name="event-destination" value="${this._tripEventDestination.name}" list="destination-list-${this._tripEventId}">
                  <datalist id="destination-list-${this._tripEventId}">
                    ${this._tripEventOptions}
                  </datalist>
                </div>

                <div class="event__field-group  event__field-group--time">
                  <label class="visually-hidden" for="event-start-time-${this._tripEventId}">
                    From
                  </label>
                  <input class="event__input  event__input--time" id="event-start-time-${this._tripEventId}" type="text" name="event-start-time" value="${this._tripEventStartTime}">
                  &mdash;
                  <label class="visually-hidden" for="event-end-time-${this._tripEventId}">
                    To
                  </label>
                  <input class="event__input  event__input--time" id="event-end-time-${this._tripEventId}" type="text" name="event-end-time" value="${this._tripEventEndTime}">
                </div>

                <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-${this._tripEventId}">
                    <span class="visually-hidden">Price</span>
                    &euro;
                  </label>
                  <input class="event__input  event__input--price" this._tripEventId="event-price-${this._tripEventId}" type="text" name="event-price" value="${this._tripEventBasePrice}">
                </div>

                <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                <button class="event__reset-btn" type="reset">
                  ${this._tripEventFormMode === Mode.EDIT ? `Delete` : `Cancel`}
                </button>

                ${this._tripEventFormMode === Mode.EDIT ? `<input id="event-favorite-${this._tripEventId}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${this._tripEventIsFavorite ? `checked` : ``}>
                <label class="event__favorite-btn" for="event-favorite-${this._tripEventId}">
                <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                </svg>
                </label>

                <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
                </button>` : ``}

              </header>

              ${this._tripEventDestination.description || renderedOffersSection ? `<section class="event__details">
                ${renderedOffersSection}
                  ${this._tripEventDestination.description ? `<section class="event__section  event__section--destination">
                  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                  <p class="event__destination-description">${this._tripEventDestination.description}</p>

                  <div class="event__photos-container">
                    <div class="event__photos-tape">
                      ${this._tripEventPhotos}
                    </div>
                  </div>
                </section>` : ``}
              </section>` : ``}

            </form>`);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._tripEventFormComponentSubmitHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);
    this._deleteButtonClickHandler = handler;
  }

  setButtonRollUpHandler(handler) {
    if (this.getElement().querySelector(`.event__rollup-btn`)) {
      this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
      this._tripEventFormComponentRollUpHandler = handler;
    }
  }

  setFavoritesButtonClickHandler(handler) {
    if (this.getElement().querySelector(`.event__favorite-checkbox`)) {
      this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`change`, handler);
      this._tripEventFormComponentFavoritesButtonClickHandler = handler;
    }
  }

  recoveryListeners() {
    this.setSubmitHandler(this._tripEventFormComponentSubmitHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this.setButtonRollUpHandler(this._tripEventFormComponentRollUpHandler);
    this.setFavoritesButtonClickHandler(this._tripEventFormComponentFavoritesButtonClickHandler);
    this._subscribeOnEvents();
  }

  removeElement() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    super.removeElement();
  }

  rerender() {
    super.rerender();

    // this._applyFlatpickr();
  }

  _applyFlatpickr() {
    if (this._flatpickrFrom) {
      this._flatpickrFrom.destroy();
      this._flatpickrFrom = null;
    }

    if (this._flatpickrTo) {
      this._flatpickrTo.destroy();
      this._flatpickrTo = null;
    }

    const dateFromElement = this.getElement().querySelector(`[name="event-start-time"]`);
    const dateToElement = this.getElement().querySelector(`[name="event-end-time"]`);

    this._flatpickrFrom = flatpickr(dateFromElement, {
      altInput: true,
      altFormat: `d/m/y H:i`,
      defaultDate: this._tripEventStartTime,
      [`time_24hr`]: true,
      enableTime: true
    });

    this._flatpickrTo = flatpickr(dateToElement, {
      altInput: true,
      altFormat: `d/m/y H:i`,
      defaultDate: this._tripEventEndTime,
      minDate: this._tripEventStartTime,
      [`time_24hr`]: true,
      enableTime: true
    });
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const typeListElement = element.querySelector(`.event__type-list`);
    const destinationInputElement = element.querySelector(`.event__input--destination`);
    const saveButtonElement = element.querySelector(`.event__save-btn`);

    const availableOffersElement = element.querySelector(`.event__available-offers`);

    typeListElement.addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `LABEL`) {
        const inputTypeListElement = typeListElement.querySelector(`#` + evt.target.htmlFor);

        this._tripEventType = inputTypeListElement.value;
        this._tripEventAction = eventActionsMap[this._tripEventType];
        this._tripEventOffers = eventOffers[this._tripEventType.toLowerCase()];
      }
      this._clearOffers();
      this.rerender();
    });

    destinationInputElement.addEventListener(`click`, () => {
      destinationInputElement.value = ``;
      saveButtonElement.disabled = true;
    });

    destinationInputElement.addEventListener(`input`, () => {

      const isInOptions = eventDestinations.some((destination) => destination === destinationInputElement.value);

      if (!isInOptions) {
        return;
      }

      this._tripEventDestination = eventDestinationsObjects.find((eventDestinationObject) => eventDestinationObject.name === destinationInputElement.value);
      this._tripEventPhotos = this._renderPhotos(this._tripEventDestination.photos);

      saveButtonElement.disabled = false;

      this.rerender();
    });

    if (availableOffersElement) {
      availableOffersElement.addEventListener(`click`, (evt) => {
        if (evt.target.tagName === `INPUT` && evt.target.checked) {
          const offerIndex = evt.target.dataset.offerId;
          const newActiveOffer = eventOffers[this._tripEventType.toLowerCase()][offerIndex];

          this._addOffer(newActiveOffer);
        } else {
          const offerIndex = evt.target.dataset.offerId;
          const newActiveOffer = eventOffers[this._tripEventType.toLowerCase()][offerIndex];

          this._removeOffer(newActiveOffer);
        }
      });
    }
  }

  _addOffer(offer) {
    this._tripEventActiveOffers.push(offer);
  }

  _removeOffer(offer) {
    this._tripEventActiveOffers = this._tripEventActiveOffers.filter((activeOffer) => activeOffer !== offer);
  }

  _clearOffers() {
    this._tripEventActiveOffers = [];
  }

  _checkIsOfferChecked(offer, activeOffers) {
    let isChecked = false;

    activeOffers.forEach((activeOffer) => {
      if (offer.title === activeOffer.title) {
        isChecked = true;
      }
    });

    return isChecked;
  }

  _renderEventOffers(offers, activeOffers) {
    return offers.map((offer, index) => {
      const {title, price} = offer;
      const isChecked = this._checkIsOfferChecked(offer, activeOffers);

      return (
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${this._tripEventId}-${index + 1}" type="checkbox" name="event-offer-${this._tripEventId}" data-offer-id="${index}"
          ${isChecked ? `checked` : ``}
          >
          <label class="event__offer-label" for="event-offer-${this._tripEventId}-${index + 1}">
            <span class="event__offer-title">${title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${price}</span>
          </label>
        </div>`.trim()
      );
    })
  .join(``);
  }

  _renderOffersSection(offers, activeOffers, id) {
    if (offers && offers.length > 0) {
      const tripEventOffers = this._renderEventOffers(offers, activeOffers, id);
      return (
        `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${tripEventOffers}
          </div>
        </section>`.trim()
      );
    }

    return ``;
  }

  _renderOptions(cities) {
    return cities.map((city) => {
      return (`<option value="${city}"></option>`.trim());
    })
  .join(`\n`);
  }

  _renderTripTypesList(types) {
    return types.map((type, id) => {
      return (
        `<div class="event__type-item">
          <input id="event-type-${type.toLowerCase()}-${id + 1}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
          <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-${id + 1}">${type}</label>
        </div>`.trim()
      );
    })
  .join(`\n`);
  }

  _renderPhotos(photos) {
    if (photos.length > 0) {
      return photos.map((photo) => {
        return (
          `<img class="event__photo" src="${photo}" alt="Event photo">`.trim()
        );
      }).join(`\n`);
    }

    return ``;
  }
}
