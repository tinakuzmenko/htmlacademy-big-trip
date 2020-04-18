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

const renderComponent = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const parseDate = (date) => {
  const dateValue = date.getDate();
  const monthValue = date.getMonth();
  const yearValue = date.getFullYear();

  const roundDate = new Date(yearValue, monthValue, dateValue);
  return Date.parse(roundDate);
};

export {increaseCounter, getRandomIntegerNumber, getRandomArrayItem, renderComponent, parseDate};
