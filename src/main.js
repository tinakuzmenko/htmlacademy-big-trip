import PageHeaderContainerComponent from './components/page-header/page-header-container.js';
import PageNavigationComponent from './components/page-header/page-navigation.js';
import PageFilterComponent from './components/page-header/page-filter.js';
import TripRouteComponent from './components/page-header/trip-route.js';
import TripCostComponent from './components/page-header/trip-cost.js';

import {createTripEvents} from './mocks/generate-trip-events.js';
import {render} from './helpers/utils.js';
import {renderTripEventsBoard} from './components/page-main/trip-events/render-trip-events-board.js';
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

renderTripEventsBoard(tripEventsObjects, tripEventsSection);
