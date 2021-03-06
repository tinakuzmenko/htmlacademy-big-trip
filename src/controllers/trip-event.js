import TripEventFormComponent from '../components/page-main/trip-event-form/trip-event-form.js';
import TripEventWrapperComponent from '../components/page-main/trip-events/trip-event-wrapper.js';
import TripEventComponent from '../components/page-main/trip-events/trip-event.js';
import {eventActionsMap, Keycode, Mode, RenderPosition, TimeInMs} from '../helpers/constants.js';
import {remove, render, replace} from "../helpers/render.js";
import {createEmptyTripEvent, getTimeDifference} from '../helpers/utils.js';

export default class TripEventController {
  constructor(tripEventContainer, offers, destinations, dataChangeHandler, viewChangeHandler) {
    this._tripEventContainer = tripEventContainer;
    this._offers = offers;
    this._destinations = destinations;
    this._dataChangeHandler = dataChangeHandler;
    this._viewChangeHandler = viewChangeHandler;
    this._mode = Mode.VIEW;

    this._SHAKE_ANIMATION_TIMEOUT = 600;

    this._tripEvent = null;
    this._tripEventComponent = null;
    this._tripEventFormComponent = null;
    this._tripEventWrapper = new TripEventWrapperComponent();

    this._tripEventComponentClickHandler = this._tripEventComponentClickHandler.bind(this);
    this._tripEventFormComponentRollUpHandler = this._tripEventFormComponentRollUpHandler.bind(this);
    this._documentEscKeydownHandler = this._documentEscKeydownHandler.bind(this);
    this._tripEventFormComponentSubmitHandler = this._tripEventFormComponentSubmitHandler.bind(this);
    this._tripEventFormComponentDeleteHandler = this._tripEventFormComponentDeleteHandler.bind(this);
    this._tripEventFormComponentFavoritesButtonClickHandler = this._tripEventFormComponentFavoritesButtonClickHandler.bind(this);
  }

  setDefaultView() {
    if (this._mode !== Mode.VIEW) {
      this._replaceEditFormToTripEvent();
    }
  }

  render(tripEvent) {
    if (!tripEvent) {
      this._renderEmptyForm();
      return;
    }

    const oldTripEventComponent = this._tripEventComponent;
    const oldTripEventFormComponent = this._tripEventFormComponent;

    this._tripEvent = tripEvent;

    this._tripEvent.timeDiff = getTimeDifference(this._tripEvent.start, this._tripEvent.end);
    this._tripEvent.action = eventActionsMap[this._tripEvent.type];

    this._tripEventComponent = new TripEventComponent(this._tripEvent);
    this._tripEventFormComponent = new TripEventFormComponent(this._tripEvent, this._offers, this._destinations, this._dataChangeHandler, this._viewChangeHandler);

    this._formElements = this._tripEventFormComponent.getElement().querySelectorAll(`input, button`);

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

  destroy() {
    if (this._tripEventComponent) {
      remove(this._tripEventComponent);
    }

    remove(this._tripEventFormComponent);
    document.removeEventListener(`keydown`, this._documentEscKeydownHandler);
  }

  shake() {
    this._tripEventFormComponent.getElement().style.animation = `shake ${this._SHAKE_ANIMATION_TIMEOUT / TimeInMs.SECOND}s`;
    this._tripEventFormComponent.getElement().style.border = `2px solid red`;

    setTimeout(() => {
      this._tripEventFormComponent.getElement().style.animation = ``;

      this._tripEventFormComponent.setButtonText({
        save: `Save`,
        delete: `Delete`,
      });

      this._enableForm();
    }, this._SHAKE_ANIMATION_TIMEOUT);
  }

  closeFormOnSuccessSave() {
    document.removeEventListener(`keydown`, this._documentEscKeydownHandler);

    if (this._tripEventComponent) {
      this._replaceEditFormToTripEvent();
    } else {
      this.destroy();
    }
  }

  closeFormOnSuccessDelete() {
    document.removeEventListener(`keydown`, this._documentEscKeydownHandler);
    this._replaceEditFormToTripEvent();
  }

  _setFormHandlers() {
    this._tripEventFormComponent.setButtonRollUpHandler(this._tripEventFormComponentRollUpHandler);
    this._tripEventFormComponent.setSubmitHandler(this._tripEventFormComponentSubmitHandler);
    this._tripEventFormComponent.setDeleteButtonClickHandler(this._tripEventFormComponentDeleteHandler);
    this._tripEventFormComponent.setFavoritesButtonClickHandler(this._tripEventFormComponentFavoritesButtonClickHandler);
  }

  _renderEmptyForm() {
    const emptyTripEvent = createEmptyTripEvent();

    this._tripEventFormComponent = new TripEventFormComponent(emptyTripEvent, this._offers, this._destinations, this._dataChangeHandler, this._viewChangeHandler, Mode.VIEW);
    this._mode = Mode.EDIT;

    render(this._tripEventContainer, this._tripEventFormComponent, RenderPosition.BEFOREBEGIN);

    this._formElements = this._tripEventFormComponent.getElement().querySelectorAll(`input, button`);

    document.addEventListener(`keydown`, this._documentEscKeydownHandler);

    this._tripEventFormComponent.setSubmitHandler(this._tripEventFormComponentSubmitHandler);
    this._tripEventFormComponent.setDeleteButtonClickHandler(this._tripEventFormComponentDeleteHandler);
  }

  _enableForm() {
    this._formElements.forEach((formElement) => {
      formElement.disabled = false;
    });
  }

  _disableForm() {
    this._formElements.forEach((formElement) => {
      formElement.disabled = true;
    });
  }

  _replaceTripEventToEditForm() {
    this._viewChangeHandler();
    this._mode = Mode.EDIT;

    replace(this._tripEventFormComponent, this._tripEventComponent);

    document.addEventListener(`keydown`, this._documentEscKeydownHandler);
  }

  _replaceEditFormToTripEvent() {
    this._tripEventFormComponent.reset();
    replace(this._tripEventComponent, this._tripEventFormComponent);

    this._mode = Mode.VIEW;
  }

  _tripEventComponentClickHandler() {
    this._replaceTripEventToEditForm();
  }

  _documentEscKeydownHandler(evt) {
    if (evt.key === Keycode.ESCAPE) {
      if (this._tripEventComponent && Mode.EDIT) {
        this._replaceEditFormToTripEvent();
        document.removeEventListener(`keydown`, this._documentEscKeydownHandler);
      } else {
        this.destroy();
        this._viewChangeHandler();
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

    this._tripEventFormComponent.setButtonText({
      save: `Saving...`
    });

    this._disableForm();
    this._dataChangeHandler(this, this._tripEvent, formData);
    this._viewChangeHandler();
  }

  _tripEventFormComponentDeleteHandler() {
    if (!this._tripEventComponent) {
      this.destroy();
      this._viewChangeHandler();
      return;
    }

    this._tripEventFormComponent.setButtonText({
      delete: `Deleting...`
    });

    this._disableForm();
    this._dataChangeHandler(this, this._tripEvent, null);
  }

  _tripEventFormComponentFavoritesButtonClickHandler() {
    const updatedTripEvent = Object.assign({}, this._tripEvent, {
      isFavorite: !this._tripEvent.isFavorite,
    });

    const isFavorite = true;

    this._dataChangeHandler(this, this._tripEvent, updatedTripEvent, isFavorite);
  }
}
