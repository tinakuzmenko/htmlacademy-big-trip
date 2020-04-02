import {renderTripInfoContainer} from "./components/trip-info-container.js";
import {renderTripRoute} from "./components/trip-route.js";
import {renderTripCost} from "./components/trip-cost.js";
import {renderPageNavigation} from "./components/page-navigation.js";
import {renderPageFilter} from "./components/page-filter.js";
import {renderTripSort} from "./components/trip-sort.js";
import {renderEventForm} from "./components/event-form.js";
import {renderDaysContainer} from "./components/days-container.js";
import {renderDay} from "./components/day.js";
import {renderEventsContainer} from "./components/events-container.js";
import {renderEvent} from "./components/event.js";

const EVENTS_AMOUNT = 3;

const renderComponent = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderManyComponents = (container, template, place, amount = EVENTS_AMOUNT) => {
  for (let i = 0; i < amount; i++) {
    renderComponent(container, template, place);
  }
};

const tripMain = document.querySelector(`.trip-main`);
const tripEvents = document.querySelector(`.trip-events`);

renderComponent(tripMain, renderTripInfoContainer(), `afterbegin`);

const tripInfoContainer = tripMain.querySelector(`.trip-info`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const [firstTitle, secondTitle] = tripControls.querySelectorAll(`h2`);

renderComponent(tripInfoContainer, renderTripRoute(), `beforeend`);
renderComponent(tripInfoContainer, renderTripCost(), `beforeend`);
renderComponent(firstTitle, renderPageNavigation(), `afterend`);
renderComponent(secondTitle, renderPageFilter(), `afterend`);
renderComponent(tripEvents, renderTripSort(), `beforeend`);
renderComponent(tripEvents, renderEventForm(), `beforeend`);
renderComponent(tripEvents, renderDaysContainer(), `beforeend`);

const daysContainer = tripEvents.querySelector(`.trip-days`);

renderComponent(daysContainer, renderDay(), `beforeend`);

const day = document.querySelector(`.day`);

renderComponent(day, renderEventsContainer(), `beforeend`);

const eventsContainer = document.querySelector(`.trip-events__list`);

renderManyComponents(eventsContainer, renderEvent(), `beforeend`);
