import {renderComponent} from '../../helpers/utils.js';
import {renderTripEvent} from "../../components/trip-events/render-trip-event.js";

const renderFilteredEvents = (events, index) => {
  const eventContainers = [...document.querySelectorAll(`.trip-events__list`)];
  events.forEach((event) => renderComponent(eventContainers[index], renderTripEvent(event), `beforeend`));
};

export {renderFilteredEvents};
