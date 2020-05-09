export default class AbstractViewComponent {
  constructor() {
    this._tripEventsControllers = [];

    this._viewChangeHandler = this._viewChangeHandler.bind(this);
  }

  getElement() {
    throw new Error(`Abstract method not implemented: getElement`);
  }

  _viewChangeHandler() {
    this._tripEventsControllers.forEach((renderedTripEvent) => renderedTripEvent.setDefaultView());
  }
}
