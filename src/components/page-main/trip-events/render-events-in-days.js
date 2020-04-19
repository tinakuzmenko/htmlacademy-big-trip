import TripEventsContainerComponent from '../trip-events/trip-events-container.js';
import TripDayComponent from '../trip-days/trip-day.js';
import TripEventComponent from './trip-event.js';
import {render} from '../../../helpers/utils.js';

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

    render(tripEventContainer, new TripEventComponent(tripEvent).getElement());
  });
};

export {renderEventsInDays};


