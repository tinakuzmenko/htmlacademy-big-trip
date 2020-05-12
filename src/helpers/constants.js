const TimeInMs = {
  DAY: 86400000,
  HOUR: 3600000,
  MINUTE: 60000,
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREBEGIN: `beforebegin`,
  BEFOREEND: `beforeend`
};

const eventActionsMap = {
  'Taxi': `to`,
  'Bus': `to`,
  'Train': `to`,
  'Ship': `to`,
  'Transport': `to`,
  'Drive': `to`,
  'Flight': `to`,
  'Check-in': `in`,
  'Sightseeing': `in`,
  'Restaurant': `in`,
};

const MONTHS = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUN`, `JUL`, `AUG`, `SEP`, `OCT`, `NOV`, `DEC`];

const MONTHS_DAYS = {
  '0': 31,
  '1': 28,
  '2': 31,
  '3': 30,
  '4': 31,
  '5': 30,
  '6': 31,
  '7': 31,
  '8': 30,
  '9': 31,
  '10': 30,
  '11': 31,
};

const Keycode = {
  ESCAPE: `Escape`,
};

const SortType = {
  EVENT: `sort-event`,
  TIME: `sort-time`,
  PRICE: `sort-price`,
};

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};


export {TimeInMs, RenderPosition, eventActionsMap, MONTHS, MONTHS_DAYS, Keycode, SortType, Mode};
