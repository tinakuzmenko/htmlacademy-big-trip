import {getTripDaysWithDates} from '../components/page-main/trip-days/get-trip-days-with-dates.js';
import TripDayComponent from '../components/page-main/trip-days/trip-day.js';
import TripDaysContainerComponent from "../components/page-main/trip-days/trip-days-container.js";
import TripEventFormComponent from '../components/page-main/trip-event-form/trip-event-form.js';
import NoTripEventsComponent from '../components/page-main/trip-events/no-trip-events.js';
import TripEventComponent from '../components/page-main/trip-events/trip-event.js';
import TripEventsContainerComponent from '../components/page-main/trip-events/trip-events-container.js';
import TripSortComponent from '../components/page-main/trip-sort/trip-sort.js';
import {Keycode, SortType} from '../helpers/constants.js';
import {render, replace} from '../helpers/render.js';
import {getSortedTripEvents} from '../helpers/utils.js';

const addTripEventToList = (tripEventListElement, tripEvent) => {
  const replaceTripEventToEditForm = () => {
    replace(tripEventEditFormComponent, tripEventComponent);
  };

  const replaceEditFormToTripEvent = () => {
    replace(tripEventComponent, tripEventEditFormComponent);
  };

  const documentEscKeydownHandler = (evt) => {
    if (evt.key === Keycode.ESCAPE) {
      replaceEditFormToTripEvent();
      document.removeEventListener(`keydown`, documentEscKeydownHandler);
    }
  };

  const tripEventComponent = new TripEventComponent(tripEvent);
  const tripEventEditFormComponent = new TripEventFormComponent(tripEvent, tripEvent.counter);

  tripEventComponent.setClickHandler(() => {
    replaceTripEventToEditForm();
    document.addEventListener(`keydown`, documentEscKeydownHandler);
  });

  tripEventEditFormComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditFormToTripEvent();
    document.removeEventListener(`keydown`, documentEscKeydownHandler);
  });

  render(tripEventListElement, tripEventComponent);
};

const renderTripEvents = (tripEvents, daysContainer, sortType = SortType.EVENT) => {
  const sortedTripEvents = getSortedTripEvents(tripEvents, sortType);
  const tripDaysObjects = getTripDaysWithDates(sortedTripEvents);

  let daysContainerCount = 0;

  sortedTripEvents.forEach((tripEvent) => {
    const {parsedStartDate} = tripEvent;
    const isTheSameDate = parsedStartDate === tripDaysObjects[daysContainerCount].date;

    if (!document.querySelector(`.day`)) {
      render(daysContainer, new TripDayComponent(tripDaysObjects[daysContainerCount], sortType));
      const dayWrapper = document.querySelector(`.day:last-child`);
      render(dayWrapper, new TripEventsContainerComponent());
    }

    if (!isTheSameDate && sortType === SortType.EVENT) {
      if (daysContainerCount < tripDaysObjects.length - 1) {
        daysContainerCount++;
      }

      render(daysContainer, new TripDayComponent(tripDaysObjects[daysContainerCount], sortType));
      const dayWrapper = document.querySelector(`.day:last-child`);
      render(dayWrapper, new TripEventsContainerComponent());
    }

    const tripEventContainer = document.querySelector(`.day:last-child .trip-events__list`);
    addTripEventToList(tripEventContainer, tripEvent);
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._noTasksComponent = new NoTripEventsComponent();
    this._sortComponent = new TripSortComponent();
    this._daysContainerComponent = new TripDaysContainerComponent();
  }

  render(tripEvents) {
    const container = this._container.getElement();

    if (!tripEvents.length) {
      render(container, this._noTasksComponent);
      return;
    }

    render(container, this._sortComponent);
    render(container, this._daysContainerComponent);

    const daysContainer = this._daysContainerComponent.getElement();
    renderTripEvents(tripEvents, daysContainer);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      const tripSortItemDay = this._sortComponent.getElement().firstElementChild;

      tripSortItemDay.textContent = sortType === SortType.EVENT ? `Day` : ``;
      daysContainer.innerHTML = ``;

      const sortedTripEvents = getSortedTripEvents(tripEvents, sortType);
      renderTripEvents(sortedTripEvents, daysContainer, sortType);
    });
  }
}
