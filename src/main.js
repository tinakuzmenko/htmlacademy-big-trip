import {renderPageNavigation} from "./components/page-header/page-navigation.js";
import {renderTripHeaderInfoContainer} from "./components/page-header/page-header-container.js";
import {renderPageFilter} from "./components/page-header/page-filter.js";
import {renderTripCost} from "./components/page-header/trip-cost.js";
import {renderTripRoute} from "./components/page-header/trip-route.js";

import {createTripDaysCounters, getTripDaysWithDates, getTripDays} from './components/page-main/trip-days/trip-days.js';
import {createTripEvents, generateTripEvent} from './components/page-main/trip-events/create-trip-events.js';
import {renderEventsInDays} from './components/page-main/trip-events/render-events-in-days.js';
import {renderTripDaysContainer} from "./components/page-main/trip-days/trip-days-container.js";
import {renderTripEventForm} from "./components/page-main/trip-event-form/render-trip-event-form.js";
import {renderTripSort} from "./components/page-main/trip-sort/trip-sort.js";

import {createUniqueTripDays, getTripEventsDates, getSortedTripEvents} from './helpers/trip-events-data.js';
import {renderComponent} from './helpers/utils.js';

const EVENTS_AMOUNT = 20;
const tripEventsObjects = createTripEvents(EVENTS_AMOUNT);

// Хэдер

const tripMain = document.querySelector(`.trip-main`);
const tripEventsSection = document.querySelector(`.trip-events`);

renderComponent(tripMain, renderTripHeaderInfoContainer(), `afterbegin`);

const tripInfoContainer = tripMain.querySelector(`.trip-info`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const [firstTitle, secondTitle] = tripControls.querySelectorAll(`h2`);

renderComponent(tripInfoContainer, renderTripRoute(tripEventsObjects));
renderComponent(tripInfoContainer, renderTripCost(tripEventsObjects));
renderComponent(firstTitle, renderPageNavigation(), `afterend`);
renderComponent(secondTitle, renderPageFilter(), `afterend`);

// Сортировка

renderComponent(tripEventsSection, renderTripSort());

// Форма
const tripEventFormObject = generateTripEvent();
renderComponent(tripEventsSection, renderTripEventForm(tripEventFormObject, tripEventFormObject.counter));

const tripEventsSortedByDate = getSortedTripEvents(tripEventsObjects);
const allTripEventsDates = getTripEventsDates(tripEventsObjects);
const uniqueTripEventsDates = createUniqueTripDays(allTripEventsDates);
const tripDaysCounters = createTripDaysCounters(uniqueTripEventsDates);
const tripDays = getTripDays(tripDaysCounters);

// События

const tripDaysObjects = getTripDaysWithDates(tripDays, uniqueTripEventsDates);

renderComponent(tripEventsSection, renderTripDaysContainer());

const daysContainer = tripEventsSection.querySelector(`.trip-days`);

renderEventsInDays(tripEventsSortedByDate, tripDaysObjects, daysContainer);
