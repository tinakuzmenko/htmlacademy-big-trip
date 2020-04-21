import TripEventsContainerComponent from '../trip-events/trip-events-container.js';
import TripDayComponent from '../trip-days/trip-day.js';
import TripEventComponent from './trip-event.js';
import TripEventFormComponent from './../trip-event-form/trip-event-form.js';
import {render} from '../../../helpers/utils.js';

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

const renderEventsInDays = (tripEventsSortedByDate, tripDaysObjects, daysContainer) => {
  let daysContainerCount = 0;

  tripEventsSortedByDate.forEach((tripEvent) => {

    const {parsedStartDate} = tripEvent;
    const isTheSameDate = parsedStartDate === tripDaysObjects[daysContainerCount].date;

    if (!document.querySelector(`.day`) || !isTheSameDate) {
      render(daysContainer, new TripDayComponent(tripDaysObjects[daysContainerCount]).getElement());

      const dayWrapper = document.querySelector(`.day:last-child`);

      render(dayWrapper, new TripEventsContainerComponent().getElement());

      if (daysContainerCount < tripDaysObjects.length - 1) {
        daysContainerCount++;
      }
    }

    const tripEventContainer = document.querySelector(`.day:last-child .trip-events__list`);

    addTripEventToList(tripEventContainer, tripEvent);
  });
};

export {renderEventsInDays};


