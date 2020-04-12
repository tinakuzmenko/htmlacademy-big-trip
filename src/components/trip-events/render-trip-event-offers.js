const renderTripEventOffers = (offers) => {
  return offers.map((offer) => {
    const {title, price} = offer;

    return (
      `<li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </li>`
    );
  })
  .join(`\n`);
};

export {renderTripEventOffers};
