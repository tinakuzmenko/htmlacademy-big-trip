import {createElement} from '../../helpers/utils.js';

const renderPageHeaderInfoContainer = () => {
  return `<section class="trip-main__trip-info  trip-info"></section>`;
};

export default class PageHeaderContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return renderPageHeaderInfoContainer();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
