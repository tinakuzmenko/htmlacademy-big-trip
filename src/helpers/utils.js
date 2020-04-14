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

const renderComponent = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export {increaseCounter, getRandomIntegerNumber, getRandomArrayItem, renderComponent};
