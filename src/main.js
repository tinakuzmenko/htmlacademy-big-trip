import {addParsedDate} from './components/trip-events/add-parsed-dates.js';
import {createTripDays} from './components/trip-days/create-trip-days.js';
import {createTripEvents} from './components/trip-events/create-trip-events-list.js';
import {getSortedEvents} from './helpers/get-sorted-events.js';
import {getTripEvent} from "./components/trip-events/create-trip-events-list.js";
import {getTripEventsDates} from './helpers/get-trip-events-dates.js';
import {renderComponent} from './helpers/utils.js';
import {renderEventsInDays} from './components/trip-events/render-events-in-days.js';
import {renderPageFilter} from "./components/page-header/render-page-filter.js";
import {renderPageNavigation} from "./components/page-header/render-page-navigation.js";
import {renderTripCost} from "./components/page-header/render-trip-cost.js";
import {renderTripDays} from './components/trip-days/render-trip-days.js';
import {renderTripDaysContainer} from "./components/containers/render-days-container.js";
import {renderTripEventForm} from "./components/trip-event-form/render-trip-event-form.js";
import {renderTripHeaderInfoContainer} from "./components/containers/render-trip-header-info-container.js";
import {renderTripRoute} from "./components/page-header/render-trip-route.js";
import {renderTripSort} from "./components/trip-sort/trip-sort.js";

const EVENTS_AMOUNT = 20;
const eventsList = createTripEvents(EVENTS_AMOUNT);

// Хэдер

const tripMain = document.querySelector(`.trip-main`);
const tripEvents = document.querySelector(`.trip-events`);

renderComponent(tripMain, renderTripHeaderInfoContainer(), `afterbegin`);

const tripInfoContainer = tripMain.querySelector(`.trip-info`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const [firstTitle, secondTitle] = tripControls.querySelectorAll(`h2`);

renderComponent(tripInfoContainer, renderTripRoute(eventsList), `beforeend`);
renderComponent(tripInfoContainer, renderTripCost(eventsList), `beforeend`);
renderComponent(firstTitle, renderPageNavigation(), `afterend`);
renderComponent(secondTitle, renderPageFilter(), `afterend`);

// Сортировка

renderComponent(tripEvents, renderTripSort(), `beforeend`);

// Форма

renderComponent(tripEvents, renderTripEventForm(getTripEvent()), `beforeend`);

// Дни

renderComponent(tripEvents, renderTripDaysContainer(), `beforeend`);

const daysContainer = tripEvents.querySelector(`.trip-days`);

const tripEventsSortedByDate = getSortedEvents(eventsList);

addParsedDate(tripEventsSortedByDate);

const tripEventsDates = getTripEventsDates(eventsList);
const tripDays = createTripDays(tripEventsDates);

renderComponent(daysContainer, renderTripDays(tripDays), `beforeend`);

// Рисуем события в днях

const dayWrappers = [...document.querySelectorAll(`.day`)];

renderEventsInDays(tripEventsSortedByDate, tripDays, dayWrappers);

