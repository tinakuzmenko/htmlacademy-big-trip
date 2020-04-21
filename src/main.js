import PageHeaderContainerComponent from './components/page-header/page-header-container.js';
import PageNavigationComponent from './components/page-header/page-navigation.js';
import PageFilterComponent from './components/page-header/page-filter.js';
import TripRouteComponent from './components/page-header/trip-route.js';
import TripCostComponent from './components/page-header/trip-cost.js';
import TripSortComponent from './components/page-main/trip-sort/trip-sort.js';
import TripDaysContainerComponent from "./components/page-main/trip-days/trip-days-container.js";

import {createTripDaysCounters, getTripDaysWithDates, getTripDays} from './components/page-main/trip-days/trip-days.js';
import {createUniqueTripDays, getTripEventsDates, getSortedTripEvents} from './helpers/trip-events-date.js';

import {createTripEvents} from './mocks/generate-trip-events.js';
import {render} from './helpers/utils.js';
import {renderEventsInDays} from './components/page-main/trip-events/render-events-in-days.js';
import {RenderPosition} from "./helpers/constants.js";

const EVENTS_AMOUNT = 20;
const tripEventsObjects = createTripEvents(EVENTS_AMOUNT);

const tripMain = document.querySelector(`.trip-main`);
const tripEventsSection = document.querySelector(`.trip-events`);

render(tripMain, new PageHeaderContainerComponent().getElement(), RenderPosition.AFTERBEGIN);

const tripInfoContainer = tripMain.querySelector(`.trip-info`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const [firstTitle, secondTitle] = tripControls.querySelectorAll(`h2`);

render(tripInfoContainer, new TripRouteComponent(tripEventsObjects).getElement());
render(tripInfoContainer, new TripCostComponent(tripEventsObjects).getElement());

render(firstTitle, new PageNavigationComponent().getElement(), RenderPosition.AFTEREND);
render(secondTitle, new PageFilterComponent().getElement(), RenderPosition.AFTEREND);
render(tripEventsSection, new TripSortComponent().getElement());

const tripEventsSortedByDate = getSortedTripEvents(tripEventsObjects);
const allTripEventsDates = getTripEventsDates(tripEventsObjects);
const uniqueTripEventsDates = createUniqueTripDays(allTripEventsDates);
const tripDaysCounters = createTripDaysCounters(uniqueTripEventsDates);
const tripDays = getTripDays(tripDaysCounters);
const tripDaysObjects = getTripDaysWithDates(tripDays, uniqueTripEventsDates);

render(tripEventsSection, new TripDaysContainerComponent().getElement());

const daysContainer = tripEventsSection.querySelector(`.trip-days`);

renderEventsInDays(tripEventsSortedByDate, tripDaysObjects, daysContainer);
