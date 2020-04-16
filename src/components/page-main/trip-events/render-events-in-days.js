import {renderComponent} from '../../../helpers/utils.js';
import {renderTripDay} from '../trip-days/trip-days.js';
import {renderTripEventsContainer} from '../trip-events/trip-events-container.js';
import {renderTripEvent} from '../trip-events/render-trip-event.js';

const renderEventsInDays = (tripEventsSortedByDate, tripDaysObjects, daysContainer) => {
  let daysContainerCount = 0;

  tripEventsSortedByDate.forEach((tripEvent) => {
    const {parsedStartDate} = tripEvent;

    if (!document.querySelector(`.day`) || parsedStartDate !== tripDaysObjects[daysContainerCount].date) {
      renderComponent(daysContainer, renderTripDay(tripDaysObjects[daysContainerCount]));

      const dayWrapper = document.querySelector(`.day:last-child`);
      renderComponent(dayWrapper, renderTripEventsContainer());

      daysContainerCount++;
    }

    const tripEventContainer = document.querySelector(`.day:last-child .trip-events__list`);

    renderComponent(tripEventContainer, renderTripEvent(tripEvent));
  });
};

export {renderEventsInDays};


