const countTripOffersCost = (offers) => {
  return offers === null ? 0 : offers.reduce((offersTotal, offerCost) => offersTotal + offerCost.price, 0);
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

export {renderTripCost};
