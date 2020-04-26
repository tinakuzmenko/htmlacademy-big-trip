let counter = 1;

const increaseCounter = () => {
  return counter++;
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const parseDate = (date) => {
  const dateValue = date.getDate();
  const monthValue = date.getMonth();
  const yearValue = date.getFullYear();

  const roundDate = new Date(yearValue, monthValue, dateValue);
  return Date.parse(roundDate);
};

const getSortedTripEvents = (tripEvents) => {
  return tripEvents.slice().sort((a, b) => a.start - b.start);
};

const getTripEventsDates = (tripEvents) => {
  return tripEvents.map((tripEvent) => {
    return new Date(tripEvent.start.getFullYear(), tripEvent.start.getMonth(), tripEvent.start.getDate());
  });
};

export {increaseCounter, getRandomIntegerNumber, getRandomArrayItem, parseDate, getSortedTripEvents, getTripEventsDates};
