import AbstractComponent from './abstract-component.js';

export default class LoadError extends AbstractComponent {
  getTemplate() {
    return (
      `<p class="trip-events__msg">Error while loading data. <br>
        Please, try again later.</p>`.trim()
    );
  }
}
