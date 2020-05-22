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

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

const TripDataTab = {
  TABLE: `table`,
  STATS: `stats`,
};

const HIDDEN_CLASS = `visually-hidden`;

const ChartTypeLabelsMap = {
  'Taxi': `🚕 TAXI`,
  'Bus': `🚌 BUS`,
  'Train': `🚂 TRAIN`,
  'Ship': `🛳 SHIP`,
  'Transport': `🚊 TRANSPORT`,
  'Drive': `🚗 DRIVE`,
  'Flight': `✈️ FLIGHT`,
  'Check-in': `🏨 CHECK-IN`,
  'Sightseeing': `🏛 SIGHTSEEING`,
  'Restaurant': `🍴 RESTAURANT`,
};

const EVENT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

const TRANSPORT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];

const ChartConfiguration = {
  BAR_HEIGHT: 55,
  BACKGROUND_COLOR: `#ffffff`,
  FONT_COLOR: `#000000`,
  CHART_TYPE: `horizontalBar`,
  CHART_PADDING_LEFT: 100,
  FONT_SIZE: 13,
  TITLE_FONT_SIZE: 23,
  SCALE_Y_AXES_TICKS_PADDING: 5,
  BAR_THICKNESS: 44,
  MIN_BAR_LENGTH: 50,
  MONEY_CHART_TEXT: `MONEY`,
  TRANSPORT_CHART_TEXT: `TRANSPORT`,
  TIME_SPEND_TEXT: `TIME-SPEND`,
};

export {TimeInMs, RenderPosition, eventActionsMap, Keycode, SortType, Mode, FilterType, TripDataTab, HIDDEN_CLASS, ChartTypeLabelsMap, EVENT_TYPES, TRANSPORT_TYPES, ChartConfiguration};
