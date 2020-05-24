import AbstractComponent from "./abstract-component";

export default class Loading extends AbstractComponent {
  getTemplate() {
    return `<section class="trip-events">
              <h2 class="visually-hidden">Trip events</h2>

              <p class="trip-events__msg">Loading...</p>
            </section>`;
  }
}
