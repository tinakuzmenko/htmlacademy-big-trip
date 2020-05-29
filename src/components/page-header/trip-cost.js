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

  getTemplate() {
    this._tripTotalCost = this._getTotal(this._tripEventsModel.getTripEvents());

    return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${this._tripTotalCost}</span>
            </p>`;
  }

  render() {
    remove(this);
    render(this._container, this);
  }

  _getTotal(tripEvents) {
    const tripTotalCost = tripEvents.reduce((total, cost) => {
      const offersTotalPrice = this._countTripOffersTotal(cost.activeOffers);
      return total + cost.basePrice + offersTotalPrice;
    }, 0);

    return tripTotalCost;
  }

  _countTripOffersTotal(offers) {
    const tripOffersCost = offers ? offers.reduce((offersTotal, offerCost) => offersTotal + offerCost.price, 0) : 0;
    return tripOffersCost;
  }

  _dataChangeHandler() {
    this.render();
  }
}
