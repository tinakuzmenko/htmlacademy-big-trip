import AbstractComponent from '../abstract-component.js';
import {render, remove} from '../../helpers/render.js';

export default class TripCost extends AbstractComponent {
  constructor(container, tripEventsModel) {
    super();
    this._container = container;
    this._tripEventsModel = tripEventsModel;

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._tripEventsModel.setDataChangeHandler(this._dataChangeHandler);
  }

  render() {
    remove(this);
    render(this._container, this);
  }

  getTemplate() {
    this._tripEventsCost = this._getTripEventsCost(this._tripEventsModel.getTripEvents());

    return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${this._tripEventsCost}</span>
            </p>`;
  }

  _getTripEventsCost(tripEvents) {
    return tripEvents.reduce((total, cost) => total + cost.basePrice + this._countTripOffersCost(cost.offers), 0);
  }

  _countTripOffersCost(offers) {
    return offers ? offers.reduce((offersTotal, offerCost) => offersTotal + offerCost.price, 0) : 0;
  }

  _dataChangeHandler() {
    this.render();
  }
}
