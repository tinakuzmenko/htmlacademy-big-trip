import TripEventsContainerComponent from '../trip-events/trip-events-container.js';
import TripDayComponent from '../trip-days/trip-day.js';
import TripEventComponent from './trip-event.js';
import TripEventFormComponent from './../trip-event-form/trip-event-form.js';

import {getSortedTripEvents} from '../../../helpers/utils.js';
import {render, replace} from '../../../helpers/render.js';
import {getTripDaysWithDates} from '../trip-days/get-trip-days-with-dates.js';
import {Keycode} from '../../../helpers/constants.js';

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

const renderEventsInDays = (tripEvents, daysContainer) => {
  const sortedTripEvents = getSortedTripEvents(tripEvents);
  const tripDaysObjects = getTripDaysWithDates(sortedTripEvents);

  let daysContainerCount = 0;

  sortedTripEvents.forEach((tripEvent) => {
    const {parsedStartDate} = tripEvent;
    const isTheSameDate = parsedStartDate === tripDaysObjects[daysContainerCount].date;

    if (!document.querySelector(`.day`)) {
      render(daysContainer, new TripDayComponent(tripDaysObjects[daysContainerCount]));
      const dayWrapper = document.querySelector(`.day:last-child`);
      render(dayWrapper, new TripEventsContainerComponent());
    }

    if (!isTheSameDate) {
      if (daysContainerCount < tripDaysObjects.length - 1) {
        daysContainerCount++;
      }

      render(daysContainer, new TripDayComponent(tripDaysObjects[daysContainerCount]));
      const dayWrapper = document.querySelector(`.day:last-child`);
      render(dayWrapper, new TripEventsContainerComponent());

    }

    const tripEventContainer = document.querySelector(`.day:last-child .trip-events__list`);
    addTripEventToList(tripEventContainer, tripEvent);
  });
};

export {renderEventsInDays};


