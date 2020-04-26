import AbstractComponent from '../abstract-component.js';

const renderPageNavigation = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
            <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
            <a class="trip-tabs__btn" href="#">Stats</a>
          </nav>`;
};

export default class PageNavigation extends AbstractComponent {
  getTemplate() {
    return renderPageNavigation();
  }
}
