import {MONTHS} from '../../../helpers/constants.js';

const renderDays = (events) => {
  return events.map((event, index) => {
    const start = event.start;
    const date = start.getDate();
    const month = start.getMonth();

    return (`<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${index + 1}</span>
                <time class="day__date" datetime="2019-03-18">${MONTHS[month - 1]} ${date + 1}</time>
              </div>
            </li>`);
  })
  .join(`\n`);
};

export {renderDays};
