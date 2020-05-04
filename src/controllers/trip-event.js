import TripEventComponent from '../components/page-main/trip-events/trip-event.js';
import TripEventFormComponent from '../components/page-main/trip-event-form/trip-event-form.js';
import {Keycode} from '../helpers/constants.js';
import {render, replace} from "../helpers/render.js";

export default class TripEventController {
  constructor(container) {
    this._container = container;
    this._tripEventComponent = null;
    this._tripEventFormComponent = null;
  }

  render(tripEvent) {
    this._tripEventComponent = new TripEventComponent(tripEvent);
    this._tripEventFormComponent = new TripEventFormComponent(tripEvent, tripEvent.counter);

    this._tripEventComponent.setClickHandler(() => {
      this._replaceTripEventToEditForm();
      document.addEventListener(`keydown`, this._documentEscKeydownHandler);
    });

    this._tripEventFormComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditFormToTripEvent();
      document.removeEventListener(`keydown`, this._documentEscKeydownHandler);
    });

    render(this._container, this._tripEventComponent);
  }

  _replaceTripEventToEditForm() {
    replace(this._tripEventFormComponent, this._tripEventComponent);
  }

  _replaceEditFormToTripEvent() {
    replace(this._tripEventComponent, this._tripEventFormComponent);
  }

  _documentEscKeydownHandler(evt) {
    if (evt.key === Keycode.ESCAPE) {
      this._replaceEditFormToTripEvent();
      document.removeEventListener(`keydown`, this._documentEscKeydownHandler);
    }
  }
}
