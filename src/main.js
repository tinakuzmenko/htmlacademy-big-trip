import {renderDay} from "./components/events-list/day/day.js";
import {renderDaysContainer} from "./components/events-list/days-container.js";
import {renderTripEvent} from "./components/events-list/trip-events/render-trip-event-template.js";
import {renderTripEventForm} from "./components/trip-event-form/trip-event-form.js";
import {renderTripEventsContainer} from "./components/events-list/trip-events-container.js";
import {renderPageFilter} from "./components/header/page-filter/page-filter.js";
import {renderPageNavigation} from "./components/header/page-navigation/page-navigation.js";
import {renderTripCost} from "./components/header/trip-cost/trip-cost.js";
import {renderTripInfoContainer} from "./components/header/trip-info-container.js";
import {renderTripRoute} from "./components/header/trip-route/trip-route.js";
import {renderTripSort} from "./components/trip-sort/trip-sort.js";

import {getTripEvent, generateTripEvents} from "./components/events-list/trip-events/generate-trip-events.js";

const EVENTS_AMOUNT = 15;

const renderComponent = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
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

// Сортировка

renderComponent(tripEvents, renderTripSort(), `beforeend`);

// Форма

renderComponent(tripEvents, renderTripEventForm(getTripEvent()), `beforeend`);

// Дни

renderComponent(tripEvents, renderDaysContainer(), `beforeend`);

const daysContainer = tripEvents.querySelector(`.trip-days`);

renderComponent(daysContainer, renderDay(), `beforeend`);

const day = document.querySelector(`.day`);

// События

renderComponent(day, renderTripEventsContainer(), `beforeend`);

const eventsContainer = document.querySelector(`.trip-events__list`);
const events = generateTripEvents(EVENTS_AMOUNT);

for (let i = 0; i < events.length; i++) {
  renderComponent(eventsContainer, renderTripEvent(events[i]), `beforeend`);
  console.log(events[i]);
}
