import {eventDestinations, eventOffers} from '../../../mocks/trip-event-mocks.js';
import AbstractSmartComponent from '../../abstract-smart-component.js';
import {EVENT_TYPES, eventActionsMap, Mode} from '../../../helpers/constants.js';
import {getTimeDifference} from '../../../helpers/utils.js';
import flatpickr from 'flatpickr';
import {encode} from "he";
import moment from 'moment';

import "flatpickr/dist/flatpickr.min.css";

export default class TripEventForm extends AbstractSmartComponent {
  constructor(tripEvent, dataChangeHandler, viewChangeHandler, mode = Mode.EDIT) {
    super();
    this._tripEvent = tripEvent;
    this._dataChangeHandler = dataChangeHandler;
    this._viewChangeHandler = viewChangeHandler;
    this._tripEventFormMode = mode;

    this._flatpickr = null;

    this._tripEventId = this._tripEvent.id;
    this._tripEventType = this._tripEvent.type;
    this._tripEventDestination = this._tripEvent.destination;
    this._tripEventAction = this._tripEvent.action;
    this._tripEventOffers = this._tripEvent.offers;
    this._tripEventActiveOffers = this._tripEvent.activeOffers;
    this._tripEventStartTime = this._getDateAndTimeFormFormat(this._tripEvent.start);
    this._tripEventEndTime = this._getDateAndTimeFormFormat(this._tripEvent.end);
    this._tripEventBasePrice = this._tripEvent.basePrice;
    this._tripEventIsFavorite = this._tripEvent.isFavorite;
    this._tripEventPhotos = this._renderPhotos(this._tripEventDestination.photos);

    this._typesTransferList = this._renderTripTypesList(EVENT_TYPES.slice(0, 7));
    this._typesActivitiesList = this._renderTripTypesList(EVENT_TYPES.slice(7, 10));
    this._tripEventCitiesDatalist = this._renderOptions(eventDestinations);

    this._dataChangeHandler = this._dataChangeHandler ? this._dataChangeHandler.bind(this) : null;
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
                  <input class="event__input  event__input--destination" id="event-destination-${this._tripEventId}" type="text" name="event-destination" value="${this._tripEventDestination.name}" list="destination-list-${this._tripEventId}" required>
                  <datalist id="destination-list-${this._tripEventId}">
                    ${this._tripEventCitiesDatalist}
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
                  <input class="event__input  event__input--price" this._tripEventId="event-price-${this._tripEventId}" type="text" name="event-price" value="${this._tripEventBasePrice}" required>
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

  createNewTripEventObject() {
    const tripEventType = this._tripEventType;
    const tripEventStartTime = new Date(moment(this._tripEventStartTime, `DD/MM/YY HH:mm`).format());
    const tripEndTime = new Date(moment(this._tripEventEndTime, `DD/MM/YY HH:mm`).format());

    this._tripEvent = {
      type: tripEventType,
      start: tripEventStartTime,
      end: tripEndTime,
      isFavorite: this._tripEventFormMode === Mode.EDIT ? this._tripEventIsFavorite : false,
      activeOffers: this._tripEventActiveOffers,
      action: eventActionsMap[tripEventType],
      parsedStartDate: Date.parse(moment(tripEventStartTime).startOf(`date`)),
      basePrice: parseInt(this._tripEventBasePrice, 10),
      destination: this._tripEventDestination,
      offers: eventOffers[tripEventType.toLowerCase()],
      timeDiff: getTimeDifference(tripEventStartTime, tripEndTime),
      id: this._tripEventId,
    };

    if (this._flatpickrEnd) {
      this._flatpickrEnd.destroy();
      this._flatpickrEnd = null;
    }

    if (this._flatpickrStart) {
      this._flatpickrStart.destroy();
      this._flatpickrStart = null;
    }

    return this._tripEvent;
  }

  rerender() {
    super.rerender();
  }

  _getDateAndTimeFormFormat(date) {
    const dateYear = date.getFullYear().toString().slice(2, 4);

    const dateValues = Array.of(date.getDate(), date.getMonth() + 1, date.getHours(), date.getMinutes()).map((value) => {
      return value < 10 ? `0` + value : value;
    });

    const [dateDay, dateMonth, dateHours, dateMinutes] = dateValues;

    return dateDay + `/` + dateMonth + `/` + dateYear + ` ` + dateHours + `:` + dateMinutes;
  }

  _applyFlatpickr(element, time) {
    const flatpickrInstance = flatpickr(element, {
      altInput: true,
      dateFormat: `d/m/y H:i`,
      altFormat: `d/m/y H:i`,
      defaultDate: `today`,
      minDate: this._tripEventStartTime,
      [`time_24hr`]: true,
      enableTime: true,
    });

    if (time === `start`) {
      this._flatpickrStart = flatpickrInstance;
      this._flatpickrStart.open();
    }

    if (time === `end`) {
      this._flatpickrEnd = flatpickrInstance;
      this._flatpickrEnd.open();
    }
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    const typeListElement = element.querySelector(`.event__type-list`);
    const destinationInputElement = element.querySelector(`.event__input--destination`);
    const saveButtonElement = element.querySelector(`.event__save-btn`);
    const availableOffersElement = element.querySelector(`.event__available-offers`);
    const inputBasePriceElement = element.querySelector(`.event__input--price`);
    const inputEventStartTimeElement = element.querySelector(`[name="event-start-time"]`);
    const inputEventEndTimeElement = element.querySelector(`[name="event-end-time"]`);

    inputEventStartTimeElement.addEventListener(`focus`, () => {
      this._applyFlatpickr(inputEventStartTimeElement, `start`);
    });

    inputEventStartTimeElement.addEventListener(`change`, () => {
      this._tripEventStartTime = inputEventStartTimeElement.value;
    });

    inputEventEndTimeElement.addEventListener(`focus`, () => {
      this._applyFlatpickr(inputEventEndTimeElement, `end`);
    });

    inputEventEndTimeElement.addEventListener(`change`, () => {
      this._tripEventEndTime = inputEventEndTimeElement.value;
    });

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

    inputBasePriceElement.addEventListener(`input`, () => {
      inputBasePriceElement.value = inputBasePriceElement.value.replace(/[^\d]/g, ``);
      this._tripEventBasePrice = encode(inputBasePriceElement.value);
    });

    destinationInputElement.addEventListener(`input`, () => {
      const isInOptions = eventDestinations.some((destination) => destination === destinationInputElement.value);

      if (!isInOptions) {
        return;
      }

      // this._tripEventDestination = eventDestinationsObjects.find((eventDestinationObject) => eventDestinationObject.name === destinationInputElement.value);
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
          `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`.trim()
        );
      }).join(`\n`);
    }

    return ``;
  }
}
