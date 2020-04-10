const renderEventOffers = (offers) => {
  return offers.map((offer) => {
    const {id, title, price} = offer;
    const isChecked = Math.random() > 0.5;

    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}"
        ${isChecked ? `checked` : ``}
        >
        <label class="event__offer-label" for="event-offer-${id}-1">
          <span class="event__offer-title">${title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
        </label>
      </div>`
    );
  })
  .join(``);
};

const renderOffers = (offers) => {
  const eventOffers = renderEventOffers(offers);
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${eventOffers}
      </div>
    </section>`
  );
};

export {renderOffers};
