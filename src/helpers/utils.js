import {RenderPosition} from './constants.js';

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

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
    case RenderPosition.BEFOREBEGIN:
      container.before(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
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

export {increaseCounter, getRandomIntegerNumber, getRandomArrayItem, createElement, render, parseDate, getSortedTripEvents, getTripEventsDates};
