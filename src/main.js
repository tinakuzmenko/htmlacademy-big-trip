import ButtonAddNewEvent from './components/page-header/new-event-button.js';
import FilterController from './controllers/filter.js';
import PageHeaderContainerComponent from './components/page-header/page-header-container.js';
import PageNavigationComponent from './components/page-header/page-navigation.js';
import TripCostComponent from './components/page-header/trip-cost.js';
import TripRouteComponent from './components/page-header/trip-route.js';
import TripEventsModel from './models/trip-events.js';
import TripEventsBoardComponent from './components/page-main/trip-events/trip-event-board.js';
import TripEventsBoardController from './controllers/trip-events-board.js';
import TripStatisticsComponent from './components/page-main/trip-statistics/trip-statistics.js';
import {RenderPosition, TripDataTab} from "./helpers/constants.js";
import {render} from './helpers/render.js';
import {createTripEvents} from './mocks/generate-trip-events.js';

const EVENTS_AMOUNT = 25;
const tripEventsObjects = createTripEvents(EVENTS_AMOUNT);

const tripEventsModel = new TripEventsModel();
tripEventsModel.setTripEvents(tripEventsObjects);

const tripMain = document.querySelector(`.trip-main`);
const pageBodyContainer = document.querySelector(`main .page-body__container`);

render(tripMain, new PageHeaderContainerComponent(), RenderPosition.AFTERBEGIN);

const tripInfoContainer = tripMain.querySelector(`.trip-info`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const firstTitle = tripControls.querySelector(`h2`);

if (tripEventsObjects.length > 0) {
  render(tripInfoContainer, new TripRouteComponent(tripEventsObjects));
}

render(tripInfoContainer, new TripCostComponent(tripEventsObjects));

const pageNavigation = new PageNavigationComponent();
render(firstTitle, pageNavigation, RenderPosition.AFTEREND);

const filterController = new FilterController(tripControls, tripEventsModel);
filterController.render();

const buttonAddNewEvent = new ButtonAddNewEvent(tripEventsModel);
render(tripMain, buttonAddNewEvent);
buttonAddNewEvent.setClickHandler();

const tripEventsBoardComponent = new TripEventsBoardComponent();
render(pageBodyContainer, tripEventsBoardComponent);

const tripEventsBoardController = new TripEventsBoardController(tripEventsBoardComponent, tripEventsModel);
tripEventsBoardController.render();

const tripStatistics = new TripStatisticsComponent(tripEventsModel.getAllTripEvents());
render(pageBodyContainer, tripStatistics);
tripStatistics.hide();

pageNavigation.setOnChange((menuItem) => {
  switch (menuItem) {
    case TripDataTab.STATS:
      pageNavigation.setActiveItem(menuItem);
      tripEventsBoardController.hide();
      tripStatistics.show();
      break;
    case TripDataTab.TABLE:
      pageNavigation.setActiveItem(menuItem);
      tripStatistics.hide();
      tripEventsBoardController.show();
      break;
  }
});
