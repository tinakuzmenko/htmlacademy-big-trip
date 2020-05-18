import ButtonAddNewEvent from './components/page-header/add-new-event.js';
import FilterController from './controllers/filter.js';
import PageHeaderContainerComponent from './components/page-header/page-header-container.js';
import PageNavigationComponent from './components/page-header/page-navigation.js';
import TripCostComponent from './components/page-header/trip-cost.js';
import TripRouteComponent from './components/page-header/trip-route.js';
import TripEventsModel from './models/trip-events.js';
import TripEventsBoardController from './controllers/trip-events-board.js';
import {RenderPosition} from "./helpers/constants.js";
import {render} from './helpers/render.js';
import {createTripEvents} from './mocks/generate-trip-events.js';

const EVENTS_AMOUNT = 10;
const tripEventsObjects = createTripEvents(EVENTS_AMOUNT);

const tripEventsModel = new TripEventsModel();
tripEventsModel.setTripEvents(tripEventsObjects);

const tripMain = document.querySelector(`.trip-main`);
const tripEventsSection = document.querySelector(`.trip-events`);

render(tripMain, new PageHeaderContainerComponent(), RenderPosition.AFTERBEGIN);

const tripInfoContainer = tripMain.querySelector(`.trip-info`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const firstTitle = tripControls.querySelector(`h2`);

if (tripEventsObjects.length > 0) {
  render(tripInfoContainer, new TripRouteComponent(tripEventsObjects));
}

render(tripInfoContainer, new TripCostComponent(tripEventsObjects));
render(firstTitle, new PageNavigationComponent(), RenderPosition.AFTEREND);

const filterController = new FilterController(tripControls, tripEventsModel);
filterController.render();

const buttonAddNewEvent = new ButtonAddNewEvent(tripEventsModel);
render(tripMain, buttonAddNewEvent);
buttonAddNewEvent.setClickHandler();

const tripEventsBoardController = new TripEventsBoardController(tripEventsSection, tripEventsModel);
tripEventsBoardController.render();
