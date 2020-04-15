import {TimeInMs} from '../../../helpers/constants.js';

const getTimeDifference = (start, end) => {
  const differenceInMs = end - start;

  const days = Math.trunc(differenceInMs / TimeInMs.DAY);
  const daysString = days > 0 ? days + `D ` : ``;

  const hours = Math.trunc((differenceInMs % TimeInMs.DAY) / TimeInMs.HOUR);
  const hoursString = hours > 0 ? hours + `H ` : ``;

  const minutes = Math.trunc(((differenceInMs % TimeInMs.DAY) % TimeInMs.HOUR) / TimeInMs.MINUTE);
  const minutesString = minutes > 0 ? minutes + `M` : ``;

  return daysString + hoursString + minutesString;
};

const getEventTimeFormat = (time) => {
  const timeValues = Array.of(time.getHours(), time.getMinutes()).map((value) => {
    return value < 10 ? `0` + value : value;
  });

  return timeValues.join(`:`);
};

export {getTimeDifference, getEventTimeFormat};
