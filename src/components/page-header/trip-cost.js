import AbstractComponent from '../abstract-component.js';

export default class TripCost extends AbstractComponent {
  constructor(tripEvents) {
    super();
    this._tripEvents = tripEvents;

    this._tripEventsCost = this._getTripEventsCost();
  }

  getTemplate() {
    return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${this._tripEventsCost}</span>
            </p>`;
  }

  _getTripEventsCost() {
    return this._tripEvents.reduce((total, cost) => total + cost.basePrice + this._countTripOffersCost(cost.offers), 0);
  }

  _countTripOffersCost(offers) {
    return offers ? offers.reduce((offersTotal, offerCost) => offersTotal + offerCost.price, 0) : 0;
  }
}
