import {getTripEvent} from "./components/trip-events/create-trip-events-list.js";
import {renderComponent} from './helpers/utils.js';
import {renderTripDaysContainer} from "./components/containers/render-days-container.js";
import {renderTripDays} from './components/trip-days/render-trip-days.js';
import {renderPageFilter} from "./components/page-header/render-page-filter.js";
import {renderPageNavigation} from "./components/page-header/render-page-navigation.js";
import {renderTripCost} from "./components/page-header/render-trip-cost.js";
import {renderTripEventForm} from "./components/trip-event-form/render-trip-event-form.js";
import {renderTripHeaderInfoContainer} from "./components/containers/render-trip-header-info-container.js";
import {renderTripRoute} from "./components/page-header/render-trip-route.js";
import {renderTripSort} from "./components/trip-sort/trip-sort.js";
import {tripEventsList, tripEventsDates} from './components/trip-events/parse-trip-events-list.js';
import {createTripDays} from './components/trip-days/create-trip-days.js';
import {renderTripEventsContainer} from "./components/containers/render-trip-events-container.js";
import {renderTripEvent} from "./components/trip-events/render-trip-event.js";

// Хэдер

const tripMain = document.querySelector(`.trip-main`);
const tripEvents = document.querySelector(`.trip-events`);

renderComponent(tripMain, renderTripHeaderInfoContainer(), `afterbegin`);

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

renderComponent(tripEvents, renderTripDaysContainer(), `beforeend`);

const daysContainer = tripEvents.querySelector(`.trip-days`);

const tripEventsSortedByDate = tripEventsList.slice().sort((a, b) => a.start - b.start);
const tripDays = createTripDays();

tripEventsSortedByDate.forEach((tripEvent) => {

  console.log(tripEvent.start);
});

// renderComponent(daysContainer, renderTripDays(tripDays), `beforeend`);

// const days = [...document.querySelectorAll(`.day`)];

// days.forEach((day) => {
//   renderComponent(day, renderTripEventsContainer(), `beforeend`);
// });

// События

// const eventsContainers = [...document.querySelectorAll(`.trip-events__list`)];

// eventsContainers.forEach((container) => {
//   tripEventsList.forEach((tripEvent, index) => {
//     const currentDate = tripEvent.start;
//     console.log(tripEvent);
//     console.log(currentDate);

// if (currentDate === tripDay) {
//   renderComponent(container, renderTripEvent(tripEvent), `beforeend`);
// }
//   });
// });
