import TripEventsContainerComponent from '../trip-events/trip-events-container.js';
import TripDayComponent from '../trip-days/trip-day.js';
import TripEventComponent from './trip-event.js';
import TripEventFormComponent from './../trip-event-form/trip-event-form.js';
import {render} from '../../../helpers/utils.js';

import {getDaysDifference, getTripDaysWithDates, getTripDays} from '../trip-days/trip-days.js';
import {createUniqueTripDays, getTripEventsDates, getSortedTripEvents} from '../../../helpers/trip-events-date.js';

const addTripEventToList = (tripEventListElement, tripEvent) => {
  const eventRollupButtonClickHandler = () => {
    tripEventListElement.replaceChild(tripEventEditFormComponent.getElement(), tripEventComponent.getElement());
  };

  const replaceEditFormToTripEvent = (evt) => {
    evt.preventDefault();
    tripEventListElement.replaceChild(tripEventComponent.getElement(), tripEventEditFormComponent.getElement());
  };

  const tripEventComponent = new TripEventComponent(tripEvent);
  const eventRollupButton = tripEventComponent.getElement().querySelector(`.event__rollup-btn`);
  eventRollupButton.addEventListener(`click`, eventRollupButtonClickHandler);

  const tripEventEditFormComponent = new TripEventFormComponent(tripEvent, tripEvent.counter);
  const eventEditForm = tripEventEditFormComponent.getElement();
  eventEditForm.addEventListener(`submit`, replaceEditFormToTripEvent);

  render(tripEventListElement, tripEventComponent.getElement());
};

const renderEventsInDays = (tripEvents, daysContainer) => {
  const sortedTripEvents = getSortedTripEvents(tripEvents);
  const allTripEventsDates = getTripEventsDates(sortedTripEvents);
  const uniqueTripEventsDates = createUniqueTripDays(allTripEventsDates);
  const tripDaysCounters = getDaysDifference(uniqueTripEventsDates);
  const tripDays = getTripDays(tripDaysCounters);
  const tripDaysObjects = getTripDaysWithDates(tripDays, uniqueTripEventsDates);

  let daysContainerCount = 0;

  sortedTripEvents.forEach((tripEvent) => {
    const {parsedStartDate} = tripEvent;
    const isTheSameDate = parsedStartDate === tripDaysObjects[daysContainerCount].date;

    if (!document.querySelector(`.day`)) {
      render(daysContainer, new TripDayComponent(tripDaysObjects[daysContainerCount]).getElement());
      const dayWrapper = document.querySelector(`.day:last-child`);
      render(dayWrapper, new TripEventsContainerComponent().getElement());
    }

    if (!isTheSameDate) {
      if (daysContainerCount < tripDaysObjects.length - 1) {
        daysContainerCount++;
      }

      render(daysContainer, new TripDayComponent(tripDaysObjects[daysContainerCount]).getElement());
      const dayWrapper = document.querySelector(`.day:last-child`);
      render(dayWrapper, new TripEventsContainerComponent().getElement());

    }

    const tripEventContainer = document.querySelector(`.day:last-child .trip-events__list`);
    addTripEventToList(tripEventContainer, tripEvent);
  });
};

export {renderEventsInDays};


