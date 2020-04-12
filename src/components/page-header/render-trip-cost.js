const getTripEventsCost = (tripEventsList) => {
  return tripEventsList.reduce((total, cost) => {
    return cost.offers === null ? total + cost.basePrice : total + cost.basePrice + cost.offers.reduce((offersTotal, offer) => {
      return offersTotal + offer.price;
    }, 0);
  }, 0);
};

const renderTripCost = (tripEventsList) => {
  const tripEventsCost = getTripEventsCost(tripEventsList);

  return `<p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripEventsCost}</span>
          </p>`;
};

export {renderTripCost};
