import AbstractComponent from '../abstract-component.js';

export default class ButtonAddNewEvent extends AbstractComponent {
  constructor(tripEventsModel) {
    super();

    this._tripEventsModel = tripEventsModel;

    this._isEnabled = this._tripEventsModel.getIsButtonNewEventEnabled();
    this._buttonModeChangeHandler = this._buttonModeChangeHandler.bind(this);

    this._tripEventsModel.setModeChangeHandler(this._buttonModeChangeHandler);
    this._tripEventsModel.setIsButtonNewEventEnabledHandler(this._buttonModeChangeHandler);
  }

  getTemplate() {
    return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`;
  }

  setClickHandler() {
    this.getElement().addEventListener(`click`, () => {
      if (this._isEnabled) {
        this._tripEventsModel.setIsCreatingMode(true);
      }
    });
  }

  _setButtonMode() {
    this.getElement().disabled = !this._isEnabled;
  }

  _buttonModeChangeHandler() {
    this._isEnabled = this._tripEventsModel.getIsButtonNewEventEnabled();
    this._setButtonMode();
  }
}
