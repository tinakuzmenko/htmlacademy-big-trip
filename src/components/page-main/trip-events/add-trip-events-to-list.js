import TripEventComponent from './trip-event.js';
import TripEventFormComponent from '../trip-event-form/trip-event-form.js';
import {Keycode} from '../../../helpers/constants.js';
import {render, replace} from "../../../helpers/render.js";

const addTripEventToList = (tripEventListElement, tripEvent) => {
  const replaceTripEventToEditForm = () => {
    replace(tripEventEditFormComponent, tripEventComponent);
  };

  const replaceEditFormToTripEvent = () => {
    replace(tripEventComponent, tripEventEditFormComponent);
  };

  const documentEscKeydownHandler = (evt) => {
    if (evt.key === Keycode.ESCAPE) {
      replaceEditFormToTripEvent();
      document.removeEventListener(`keydown`, documentEscKeydownHandler);
    }
  };

  const tripEventComponent = new TripEventComponent(tripEvent);
  const tripEventEditFormComponent = new TripEventFormComponent(tripEvent, tripEvent.counter);

  tripEventComponent.setClickHandler(() => {
    replaceTripEventToEditForm();
    document.addEventListener(`keydown`, documentEscKeydownHandler);
  });

  tripEventEditFormComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditFormToTripEvent();
    document.removeEventListener(`keydown`, documentEscKeydownHandler);
  });

  render(tripEventListElement, tripEventComponent);
};

export {addTripEventToList};
