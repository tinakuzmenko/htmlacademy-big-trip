import AbstractSmartComponent from '../abstract-smart-component.js';

export default class TripCost extends AbstractSmartComponent {
  constructor(tripEventsModel) {
    super();
    this._tripEventsModel = tripEventsModel;
  }

  getTemplate() {
    this._tripEvents = this._tripEventsModel.getTripEvents();
    this._tripEventsCost = this._getTripEventsCost();

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
