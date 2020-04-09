import {renderDay} from "./components/events-list/day/day.js";
import {renderDaysContainer} from "./components/events-list/days-container.js";
import {renderEvent} from "./components/events-list/route-point/render-route-point.js";
import {renderEventForm} from "./components/trip-form/event-form.js";
import {renderEventsContainer} from "./components/events-list/events-container.js";
import {renderPageFilter} from "./components/header/page-filter/page-filter.js";
import {renderPageNavigation} from "./components/header/page-navigation/page-navigation.js";
import {renderTripCost} from "./components/header/trip-cost/trip-cost.js";
import {renderTripInfoContainer} from "./components/header/trip-info-container.js";
import {renderTripRoute} from "./components/header/trip-route/trip-route.js";
import {renderTripSort} from "./components/trip-sort/trip-sort.js";

import {getRoutePoint} from "./components/events-list/route-point/route-point.js";

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

console.log(getRoutePoint());
