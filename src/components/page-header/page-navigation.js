import AbstractComponent from '../abstract-component.js';
export default class PageNavigation extends AbstractComponent {
  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
              <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-tab="table">Table</a>
              <a class="trip-tabs__btn" href="#" data-tab="stats">Stats</a>
            </nav>`;
  }

  setActiveItem(menuTab) {
    const activeItem = this.getElement().querySelector(`.trip-tabs__btn--active`);
    const checkedItem = this.getElement().querySelector(`[data-tab="${menuTab}"]`);

    activeItem.classList.remove(`trip-tabs__btn--active`);
    checkedItem.classList.add(`trip-tabs__btn--active`);
  }

  setChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const menuTab = evt.target.dataset.tab;
      handler(menuTab);
    });
  }
}
