import {renderComponent} from '../../helpers/utils.js';
import {renderTripEventsContainer} from '../containers/render-trip-events-container.js';
import {renderFilteredEvents} from './render-filtered-events.js';

const renderEventsInDays = (sortedEvents, days, wrappers) => {
  days.forEach((day, index) => {
    const renderedEvents = sortedEvents.filter((event) => {
      return event.parsedStart === day;
    });

    renderComponent(wrappers[index], renderTripEventsContainer(), `beforeend`);
    renderFilteredEvents(renderedEvents, index);
  });
};

export {renderEventsInDays};
