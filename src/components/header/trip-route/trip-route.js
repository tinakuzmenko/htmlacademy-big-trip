import {tripEventsList} from '../../events-list/trip-events/trip-events-list.js';

const getTripRoute = (tripEvents) => {
  const tripEventsCities = tripEvents.map((tripEvent) => tripEvent.city);
  const uniqueCities = [...new Set(tripEventsCities)].sort();
  const fullRoute = uniqueCities.join(` — `);
  const shortRoute = uniqueCities.slice(0, 1) + ` — … — ` + uniqueCities.slice(uniqueCities.length - 1);

  return tripEventsCities.length < 3 ? fullRoute : shortRoute;
};

const renderTripRoute = () => {
  const title = getTripRoute(tripEventsList);

  return `<div class="trip-info__main">
            <h1 class="trip-info__title">${title}</h1>

            <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
          </div>`;
};

export {renderTripRoute};
