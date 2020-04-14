const getTripEventsCost = (tripEvents) => {
  return tripEvents.reduce((total, cost) => {
    return cost.offers === null ? total + cost.basePrice : total + cost.basePrice + cost.offers.reduce((offersTotal, offer) => {
      return offersTotal + offer.price;
    }, 0);
  }, 0);
};

const renderTripCost = (tripEvents) => {
  const tripEventsCost = getTripEventsCost(tripEvents);

  return `<p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripEventsCost}</span>
          </p>`.trim();
};

export {renderTripCost};
