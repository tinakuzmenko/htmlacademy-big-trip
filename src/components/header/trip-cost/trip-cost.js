import {tripEventsCost} from '../../events-list/trip-events/trip-events-list.js';

const renderTripCost = () => {
  return `<p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripEventsCost}</span>
          </p>`;
};

export {renderTripCost};
