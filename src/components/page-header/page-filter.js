import AbstractComponent from '../abstract-component.js';

export default class PageFilter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;

    this._FILTER_ID_PREFIX = `filter-`;
  }

  getTemplate() {
    const filtersMarkup = this._filters.map((filter) => this._createFilterMarkup(filter, filter.checked)).join(`\n`);

    return `<form class="trip-filters" action="#" method="get">
              ${filtersMarkup}
              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>`;
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = this._getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }

  _getFilterNameById(id) {
    return id.substring(this._FILTER_ID_PREFIX.length);
  }

  _createFilterMarkup(filter, isChecked) {
    const {name, count} = filter;
    const isActive = count > 0 ? `` : `disabled`;

    return `<div class="trip-filters__filter">
              <input
                id="filter-${name}"
                class="trip-filters__filter-input visually-hidden"
                type="radio"
                name="trip-filter"
                value="${name}"
                ${isChecked ? `checked` : ``}
                ${isActive}>
              <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
            </div>`;
  }
}
