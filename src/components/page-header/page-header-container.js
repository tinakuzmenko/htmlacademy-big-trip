import AbstractComponent from '../abstract-component.js';

const renderPageHeaderInfoContainer = () => {
  return `<section class="trip-main__trip-info  trip-info"></section>`;
};

export default class PageHeaderContainer extends AbstractComponent {
  getTemplate() {
    return renderPageHeaderInfoContainer();
  }
}
