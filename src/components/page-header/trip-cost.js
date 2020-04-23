import {createElement} from '../../helpers/utils.js';

const countTripOffersCost = (offers) => {
  return Array.isArray(offers) ? offers.reduce((offersTotal, offerCost) => offersTotal + offerCost.price, 0) : 0;
};

const getTripEventsCost = (tripEvents) => {
  return tripEvents.reduce((total, cost) => total + cost.basePrice + countTripOffersCost(cost.offers), 0);
};

const renderTripCost = (tripEvents) => {
  const tripEventsCost = getTripEventsCost(tripEvents);

  return `<p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripEventsCost}</span>
          </p>`;
};

export default class TripCost {
  constructor(tripEvents) {
    this._tripEvents = tripEvents;
    this._element = null;
  }

  getTemplate() {
    return renderTripCost(this._tripEvents);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
