export const HIDDEN_CLASS = `visually-hidden`;
export const EMPTY_TRIP_EVENT_FORM = null;
export const EVENT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
export const TRANSPORT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];

export const ChartConfiguration = {
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

export const TimeInMs = {
  DAY: 86400000,
  HOUR: 3600000,
  MINUTE: 60000,
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREBEGIN: `beforebegin`,
  BEFOREEND: `beforeend`
};

export const Keycode = {
  ESCAPE: `Escape`,
};

export const SortType = {
  EVENT: `sort-event`,
  TIME: `sort-time`,
  PRICE: `sort-price`,
};

export const Mode = {
  VIEW: `default`,
  EDIT: `edit`,
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

export const TripDataTab = {
  TABLE: `table`,
  STATS: `stats`,
};

export const ChartTypeLabelsMap = {
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

export const eventActionsMap = {
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


