import AbstractComponent from '../abstract-component.js';
export default class PageHeaderContainer extends AbstractComponent {
  getTemplate() {
    return `<section class="trip-main__trip-info  trip-info"></section>`;
  }
}
