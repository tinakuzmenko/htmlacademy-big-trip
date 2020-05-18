import AbstractComponent from '../abstract-component.js';

export default class ButtonAddNewEvent extends AbstractComponent {
  constructor(tripEventsModel) {
    super();

    this._tripEventsModel = tripEventsModel;
    this._isDisabled = this._tripEventsModel.getIsCreatingMode();
    this._buttonModeChangeHandler = this._buttonModeChangeHandler.bind(this);

    this._tripEventsModel.setModeChangeHandler(this._buttonModeChangeHandler);
  }

  getTemplate() {
    return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`;
  }

  setClickHandler() {
    this.getElement().addEventListener(`click`, () => {
      if (!this._isDisabled) {
        this._tripEventsModel.setIsCreatingMode(true);
      }
    });
  }

  setButtonMode() {
    this.getElement().disabled = this._isDisabled;
  }

  _buttonModeChangeHandler() {
    this._isDisabled = this._tripEventsModel.getIsCreatingMode();
    this.setButtonMode();
  }
}
