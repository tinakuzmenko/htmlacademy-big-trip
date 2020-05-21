import AbstractComponent from '../../abstract-component.js';

export default class TripEventBoard extends AbstractComponent {
  getTemplate() {
    return `<section class="trip-events">
              <h2 class="visually-hidden">Trip events</h2>
            </section>`;
  }
}
