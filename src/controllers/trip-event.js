import TripEventComponent from '../components/page-main/trip-events/trip-event.js';
import TripEventFormComponent from '../components/page-main/trip-event-form/trip-event-form.js';
import TripEventWrapperComponent from '../components/page-main/trip-events/trip-event-wrapper.js';
import TripEventAdapter from '../models/trip-event.js';
import {createEmptyTripEvent} from '../helpers/utils.js';
import {Keycode, RenderPosition, Mode} from '../helpers/constants.js';
import {render, replace, remove} from "../helpers/render.js";

export default class TripEventController {
  constructor(tripEventContainer, offers, destinations, dataChangeHandler, viewChangeHandler) {
    this._tripEventContainer = tripEventContainer;
    this._offers = offers;
    this._destinations = destinations;
    this._dataChangeHandler = dataChangeHandler;
    this._viewChangeHandler = viewChangeHandler;
    this._mode = Mode.VIEW;

    this._tripEvent = null;
    this._tripEventComponent = null;
    this._tripEventFormComponent = null;
    this._tripEventWrapper = new TripEventWrapperComponent();
    this._SHAKE_ANIMATION_TIMEOUT = 600;

    this._tripEventComponentClickHandler = this._tripEventComponentClickHandler.bind(this);
    this._tripEventFormComponentRollUpHandler = this._tripEventFormComponentRollUpHandler.bind(this);
    this._documentEscKeydownHandler = this._documentEscKeydownHandler.bind(this);
    this._tripEventFormComponentSubmitHandler = this._tripEventFormComponentSubmitHandler.bind(this);
    this._tripEventFormComponentDeleteHandler = this._tripEventFormComponentDeleteHandler.bind(this);
    this._tripEventFormComponentFavoritesButtonClickHandler = this._tripEventFormComponentFavoritesButtonClickHandler.bind(this);
  }

  render(tripEvent) {
    if (!tripEvent) {
      const emptyTripEventObject = createEmptyTripEvent();

      this._tripEventFormComponent = new TripEventFormComponent(emptyTripEventObject, this._offers, this._destinations, this._dataChangeHandler, this._viewChangeHandler, Mode.VIEW);
      this._mode = Mode.EDIT;

      render(this._tripEventContainer, this._tripEventFormComponent, RenderPosition.BEFOREBEGIN);
      document.addEventListener(`keydown`, this._documentEscKeydownHandler);

      this._tripEventFormComponent.setSubmitHandler(this._tripEventFormComponentSubmitHandler);
      this._tripEventFormComponent.setDeleteButtonClickHandler(this._tripEventFormComponentDeleteHandler);

      return;
    }

    this._tripEvent = tripEvent;

    const oldTripEventComponent = this._tripEventComponent;
    const oldTripEventFormComponent = this._tripEventFormComponent;

    this._tripEventComponent = new TripEventComponent(this._tripEvent);
    this._tripEventFormComponent = new TripEventFormComponent(this._tripEvent, this._offers, this._destinations, this._dataChangeHandler, this._viewChangeHandler);

    this._tripEventComponent.setClickHandler(this._tripEventComponentClickHandler);
    this._setFormHandlers();

    if (oldTripEventFormComponent && oldTripEventComponent) {
      replace(this._tripEventComponent, oldTripEventComponent);
      replace(this._tripEventFormComponent, oldTripEventFormComponent);
    } else {
      render(this._tripEventWrapper.getElement(), this._tripEventComponent);
      render(this._tripEventContainer.getElement(), this._tripEventWrapper);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.VIEW) {
      this._replaceEditFormToTripEvent();
    }
  }

  destroy() {
    if (this._tripEventComponent) {
      remove(this._tripEventComponent);
    }

    remove(this._tripEventFormComponent);

    document.removeEventListener(`keydown`, this._documentEscKeydownHandler);
  }

  shake() {
    this._tripEventFormComponent.getElement().style.animation = `shake ${this._SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._tripEventFormComponent.getElement().style.border = `2px solid red`;

    setTimeout(() => {
      this._tripEventFormComponent.getElement().style.animation = ``;

      this._tripEventFormComponent.setData({
        SAVE_BUTTON_TEXT: `Save`,
        DELETE_BUTTON_TEXT: `Delete`,
      });

      this._enableForm();
    }, this._SHAKE_ANIMATION_TIMEOUT);
  }

  closeTripEventFormOnSuccessSave() {
    document.removeEventListener(`keydown`, this._documentEscKeydownHandler);

    if (this._tripEventComponent) {
      this._replaceEditFormToTripEvent();
    } else {
      this.destroy();
    }
  }

  closeTripEventFormOnSuccessDelete() {
    document.removeEventListener(`keydown`, this._documentEscKeydownHandler);
    this._viewChangeHandler();
    this._mode = Mode.VIEW;
  }

  _replaceTripEventToEditForm() {
    this._viewChangeHandler();
    replace(this._tripEventFormComponent, this._tripEventComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditFormToTripEvent() {
    replace(this._tripEventComponent, this._tripEventFormComponent);
    this._tripEventFormComponent = new TripEventFormComponent(this._tripEvent, this._offers, this._destinations, this._dataChangeHandler, this._viewChangeHandler);
    this._setFormHandlers();
    this._mode = Mode.VIEW;
  }

  _setFormHandlers() {
    this._tripEventFormComponent.setButtonRollUpHandler(this._tripEventFormComponentRollUpHandler);
    this._tripEventFormComponent.setSubmitHandler(this._tripEventFormComponentSubmitHandler);
    this._tripEventFormComponent.setDeleteButtonClickHandler(this._tripEventFormComponentDeleteHandler);
    this._tripEventFormComponent.setFavoritesButtonClickHandler(this._tripEventFormComponentFavoritesButtonClickHandler);
  }

  _tripEventComponentClickHandler() {
    this._replaceTripEventToEditForm();
    document.addEventListener(`keydown`, this._documentEscKeydownHandler);
  }

  _documentEscKeydownHandler(evt) {
    if (evt.key === Keycode.ESCAPE) {
      document.removeEventListener(`keydown`, this._documentEscKeydownHandler);

      if (this._tripEventComponent) {
        this._replaceEditFormToTripEvent();
      } else {
        this.destroy();
      }
    }
  }

  _tripEventFormComponentRollUpHandler() {
    this._replaceEditFormToTripEvent();
    document.removeEventListener(`keydown`, this._documentEscKeydownHandler);
  }

  _tripEventFormComponentSubmitHandler(evt) {
    evt.preventDefault();
    const formData = this._tripEventFormComponent.getData();
    const data = this._prepareData(formData);

    this._tripEventFormComponent.setData({
      SAVE_BUTTON_TEXT: `Saving...`
    });

    this._disableForm();
    this._dataChangeHandler(this, this._tripEvent, data);
  }

  _tripEventFormComponentDeleteHandler() {
    if (!this._tripEventComponent) {
      this.destroy();
      this._viewChangeHandler();
      return;
    }

    this._tripEventFormComponent.setData({
      DELETE_BUTTON_TEXT: `Deleting...`
    });

    this._disableForm();
    this._dataChangeHandler(this, this._tripEvent, null);
  }

  _tripEventFormComponentFavoritesButtonClickHandler() {
    const updatedTripEvent = Object.assign({}, this._tripEvent, {
      isFavorite: !this._tripEvent.isFavorite,
    });
    const data = this._prepareData(updatedTripEvent);
    const isFavorite = true;

    this._dataChangeHandler(this, this._tripEvent, data, isFavorite);
  }

  _enableForm() {
    const formElements = this._tripEventFormComponent.getElement().querySelectorAll(`input, button`);

    formElements.forEach((formElement) => {
      formElement.disabled = false;
    });
  }

  _disableForm() {
    const formElements = this._tripEventFormComponent.getElement().querySelectorAll(`input, button`);

    formElements.forEach((formElement) => {
      formElement.disabled = true;
    });
  }

  _prepareData(formData) {
    const tripEventAdapter = new TripEventAdapter(formData);
    const data = tripEventAdapter.toRAW(formData);

    return data;
  }
}
