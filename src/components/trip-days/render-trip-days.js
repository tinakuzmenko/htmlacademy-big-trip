import {MONTHS} from '../../helpers/constants.js';

const renderTripDays = (dates) => {
  return dates.map((date, index) => {
    const dateString = new Date(date);

    const dateValue = dateString.getDate();
    const monthValue = dateString.getMonth();
    const yearValue = dateString.getFullYear();

    return (`<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${index + 1}</span>
                <time class="day__date" datetime="${yearValue}-${monthValue + 1}-${dateValue}">${MONTHS[monthValue]} ${dateValue}</time>
              </div>
            </li>`);
  })
  .join(`\n`);
};

export {renderTripDays};
