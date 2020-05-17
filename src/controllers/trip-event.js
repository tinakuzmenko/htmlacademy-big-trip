import TripEventComponent from '../components/page-main/trip-events/trip-event.js';
import TripEventFormComponent from '../components/page-main/trip-event-form/trip-event-form.js';
import TripEventWrapperComponent from '../components/page-main/trip-events/trip-event-wrapper.js';
import {createEmptyTripEvent} from '../helpers/utils.js';
import {Keycode, RenderPosition, Mode} from '../helpers/constants.js';
import {render, replace, remove} from "../helpers/render.js";

export default class TripEventController {
  constructor(tripEventContainer, dataChangeHandler, viewChangeHandler) {
    this._tripEventContainer = tripEventContainer;
    this._dataChangeHandler = dataChangeHandler;
    this._viewChangeHandler = viewChangeHandler;
    this._mode = Mode.DEFAULT;

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

  render(tripEvent) {
    if (!tripEvent) {
      const emptyTripEventObject = createEmptyTripEvent();

      this._tripEventFormComponent = new TripEventFormComponent(emptyTripEventObject, this._dataChangeHandler, this._viewChangeHandler, Mode.DEFAULT);
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
    this._tripEventFormComponent = new TripEventFormComponent(this._tripEvent);

    this._tripEventComponent.setClickHandler(this._tripEventComponentClickHandler);
    this._tripEventFormComponent.setButtonRollUpHandler(this._tripEventFormComponentRollUpHandler);
    this._tripEventFormComponent.setSubmitHandler(this._tripEventFormComponentSubmitHandler);
    this._tripEventFormComponent.setDeleteButtonClickHandler(this._tripEventFormComponentDeleteHandler);
    this._tripEventFormComponent.setFavoritesButtonClickHandler(this._tripEventFormComponentFavoritesButtonClickHandler);

    if (oldTripEventFormComponent && oldTripEventComponent) {
      replace(this._tripEventComponent, oldTripEventComponent);
      replace(this._tripEventFormComponent, oldTripEventFormComponent);
    } else {
      render(this._tripEventWrapper.getElement(), this._tripEventComponent);
      render(this._tripEventContainer.getElement(), this._tripEventWrapper);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
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

  _replaceTripEventToEditForm() {
    this._viewChangeHandler();
    replace(this._tripEventFormComponent, this._tripEventComponent);

    this._mode = Mode.EDIT;
  }

  _replaceEditFormToTripEvent() {
    this._tripEventFormComponent.getElement().reset();
    replace(this._tripEventComponent, this._tripEventFormComponent);

    this._mode = Mode.DEFAULT;
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
    const newTripEvent = this._tripEventFormComponent.createNewTripEventObject();
    this._dataChangeHandler(this, this._tripEvent, newTripEvent);
    document.removeEventListener(`keydown`, this._documentEscKeydownHandler);
    this._tripEventFormComponent.disableForm();

    if (this._tripEventComponent) {
      this._replaceEditFormToTripEvent();
    } else {
      this.destroy();
    }
  }

  _tripEventFormComponentDeleteHandler() {
    document.removeEventListener(`keydown`, this._documentEscKeydownHandler);
    this._viewChangeHandler();
    this._tripEventFormComponent.disableForm();

    if (this._tripEventComponent) {
      this._dataChangeHandler(this, this._tripEvent, null);
    } else {
      this.destroy();
    }
  }

  _tripEventFormComponentFavoritesButtonClickHandler() {
    const updatedTripEvent = Object.assign({}, this._tripEvent, {
      isFavorite: !this._tripEvent.isFavorite,
    });
    this._dataChangeHandler(this, this._tripEvent, updatedTripEvent);
  }
}
