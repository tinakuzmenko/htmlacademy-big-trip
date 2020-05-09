import PageFilterComponent from './components/page-header/page-filter.js';
import PageHeaderContainerComponent from './components/page-header/page-header-container.js';
import PageNavigationComponent from './components/page-header/page-navigation.js';
import TripCostComponent from './components/page-header/trip-cost.js';
import TripRouteComponent from './components/page-header/trip-route.js';
import TripEventsBoardController from './controllers/trip-events-board.js';
import {RenderPosition} from "./helpers/constants.js";
import {render} from './helpers/render.js';
import {createTripEvents} from './mocks/generate-trip-events.js';

const EVENTS_AMOUNT = 22;
const tripEventsObjects = createTripEvents(EVENTS_AMOUNT);

const tripMain = document.querySelector(`.trip-main`);
const tripEventsSection = document.querySelector(`.trip-events`);

render(tripMain, new PageHeaderContainerComponent(), RenderPosition.AFTERBEGIN);

const tripInfoContainer = tripMain.querySelector(`.trip-info`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const [firstTitle, secondTitle] = tripControls.querySelectorAll(`h2`);

if (tripEventsObjects.length > 0) {
  render(tripInfoContainer, new TripRouteComponent(tripEventsObjects));
}

render(tripInfoContainer, new TripCostComponent(tripEventsObjects));
render(firstTitle, new PageNavigationComponent(), RenderPosition.AFTEREND);
render(secondTitle, new PageFilterComponent(), RenderPosition.AFTEREND);


const tripEventsBoardComponent = new TripEventsBoardController(tripEventsSection);

tripEventsBoardComponent.render(tripEventsObjects);
