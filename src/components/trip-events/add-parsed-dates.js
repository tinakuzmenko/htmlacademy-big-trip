import {parseDate} from '../../helpers/parse-date.js';

const addParsedDate = (events) => {
  return events.map((event) => {
    event.parsedStart = parseDate(event.start);
  });
};

export {addParsedDate};
