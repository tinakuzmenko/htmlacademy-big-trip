import PageFilterComponent from '../components/page-header/page-filter.js';
import {FilterType} from '../helpers/constants.js';
import {render, replace} from '../helpers/render.js';
import {getTripEventsByFilter} from '../helpers/utils.js';

export default class FilterController {
  constructor(container, tripEventsModel) {
    this._container = container;
    this._tripEventsModel = tripEventsModel;

    this._activeFilterType = FilterType.EVERYTHING;
    this._filterComponent = null;

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._filterChangeHandler = this._filterChangeHandler.bind(this);

    this._tripEventsModel.setDataChangeHandler(this._dataChangeHandler);
    this._tripEventsModel.setFilterChangeHandler(this._dataChangeHandler);
  }

  render() {
    this._allTripEvents = this._tripEventsModel.getAllTripEvents();
    this._filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getTripEventsByFilter(this._allTripEvents, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new PageFilterComponent(this._filters);
    this._filterComponent.setFilterChangeHandler(this._filterChangeHandler);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(this._container, this._filterComponent);
    }
  }

  _filterChangeHandler(filterType) {
    this._tripEventsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _dataChangeHandler() {
    this._activeFilterType = this._tripEventsModel.getFilter();
    this.render();
  }
}
