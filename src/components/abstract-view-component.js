export default class AbstractViewComponent {
  constructor() {
    this._tripEventsControllers = [];

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);
  }

  getElement() {
    throw new Error(`Abstract method not implemented: getElement`);
  }

  _viewChangeHandler() {
    this._tripEventsControllers.forEach((renderedTripEvent) => renderedTripEvent.setDefaultView());
  }

  _dataChangeHandler(tripEventController, oldTripEvent, updatedTripEvent) {
    const index = this._sortedTripEvents.findIndex((tripEvent) => tripEvent === oldTripEvent);

    if (index === -1) {
      return;
    }

    this._sortedTripEvents = [].concat(this._sortedTripEvents.slice(0, index), updatedTripEvent, this._sortedTripEvents.slice(index + 1));
    tripEventController.render(this._sortedTripEvents[index]);
  }
}
