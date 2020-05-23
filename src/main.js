import API from './api.js';
import ButtonAddNewEventComponent from './components/page-header/new-event-button.js';
import FilterController from './controllers/filter.js';
import LoadingComponent from './components/loading.js';
import PageHeaderContainerComponent from './components/page-header/page-header-container.js';
import PageNavigationComponent from './components/page-header/page-navigation.js';
import TripCostComponent from './components/page-header/trip-cost.js';
import TripRouteComponent from './components/page-header/trip-route.js';
import TripEventsModel from './models/trip-events.js';
import TripEventsBoardComponent from './components/page-main/trip-events/trip-event-board.js';
import TripEventsBoardController from './controllers/trip-events-board.js';
import TripStatisticsComponent from './components/page-main/trip-statistics/trip-statistics.js';
import {RenderPosition, TripDataTab} from "./helpers/constants.js";
import {render, remove} from './helpers/render.js';

const AUTHORIZATION = `Basic y2StXBzjFLjS18cFEPo8wl4HcxPg7rjm`;

const tripMain = document.querySelector(`.trip-main`);
const pageBodyContainer = document.querySelector(`main .page-body__container`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const firstTitle = tripControls.querySelector(`h2`);

const api = new API(AUTHORIZATION);
const tripEventsModel = new TripEventsModel();
const pageHeaderContainerComponent = new PageHeaderContainerComponent();
const pageNavigationComponent = new PageNavigationComponent();
const loadingComponent = new LoadingComponent();
const filterController = new FilterController(tripControls, tripEventsModel);
const buttonAddNewEventComponent = new ButtonAddNewEventComponent(tripEventsModel);
const tripEventsBoardComponent = new TripEventsBoardComponent();
const tripEventsBoardController = new TripEventsBoardController(tripEventsBoardComponent, tripEventsModel, api);
const tripStatisticsComponent = new TripStatisticsComponent(tripEventsModel);
const tripRouteComponent = new TripRouteComponent(tripEventsModel);
const tripCostComponent = new TripCostComponent(tripEventsModel);

render(tripMain, pageHeaderContainerComponent, RenderPosition.AFTERBEGIN);
render(firstTitle, pageNavigationComponent, RenderPosition.AFTEREND);
render(tripMain, buttonAddNewEventComponent);
render(pageBodyContainer, loadingComponent);
render(pageBodyContainer, tripEventsBoardComponent);
render(pageBodyContainer, tripStatisticsComponent);

const tripInfoContainer = tripMain.querySelector(`.trip-info`);

filterController.render();
buttonAddNewEventComponent.setClickHandler();
tripStatisticsComponent.hide();

pageNavigationComponent.setChangeHandler((menuItem) => {
  switch (menuItem) {
    case TripDataTab.STATS:
      pageNavigationComponent.setActiveItem(menuItem);
      tripEventsBoardController.hide();
      tripStatisticsComponent.show();
      break;
    case TripDataTab.TABLE:
      pageNavigationComponent.setActiveItem(menuItem);
      tripStatisticsComponent.hide();
      tripEventsBoardController.show();
      break;
  }
});

api.getData()
  .then((data) => {
    tripEventsModel.setTripEvents(data.tripEvents);
    tripEventsModel.setOffers(data.offers);
    tripEventsModel.setDestinations(data.destinations);
  })
  .then(() => {
    remove(loadingComponent);
    render(tripInfoContainer, tripRouteComponent);
    render(tripInfoContainer, tripCostComponent);
    tripEventsBoardController.render();
  });
