import AbstractComponent from "../../abstract-component";
import {ChartTypeLabelsMap} from '../../../helpers/constants.js';
import {getTimeDifference} from '../trip-events/get-time-difference.js';
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';

export default class TripStatistics extends AbstractComponent {
  constructor(tripEvents) {
    super();

    this._tripEvents = tripEvents;
    this.renderChart();
  }

  getTemplate() {
    return `<section class="statistics">
              <h2 class="visually-hidden">Trip statistics</h2>

              <div class="statistics__item statistics__item--money">
                <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
              </div>

              <div class="statistics__item statistics__item--transport">
                <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
              </div>

              <div class="statistics__item statistics__item--time-spend">
                <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
              </div>
            </section>`;
  }

  _getTripEventsTypes() {
    let types = [];

    this._tripEvents.forEach((tripEvent) => {
      if (types.indexOf(tripEvent.type) === -1) {
        types.push(tripEvent.type);
      }
    });

    return types;
  }

  _getTripEventsLabels() {
    return this._tripEventsTypes.map((tripEvent) => {
      return ChartTypeLabelsMap[tripEvent];
    });
  }

  _getMoneyValues(tripEventType) {
    const allTripEventsTypes = this._filterTripEventTypes(tripEventType);
    return allTripEventsTypes.reduce((totalValue, tripEvent) => totalValue + tripEvent.basePrice, 0);
  }

  _getTimeSpend(tripEventType) {
    const allTripEventsTypes = this._filterTripEventTypes(tripEventType);
    return allTripEventsTypes.reduce((totalTimeDifference, tripEvent) => totalTimeDifference + (tripEvent.end - tripEvent.start), 0);
  }

  // _getTimeSpendFormat() {
  //   return this._tripEventsTypes.map((eventType) => {

  //     const days = Math.trunc(difference / TimeInMs.DAY);
  //     const daysString = createTimeString(days, `D`);

  //     const hours = Math.trunc((difference % TimeInMs.DAY) / TimeInMs.HOUR);
  //     const hoursString = createTimeString(hours, `H`);
  //   });
  // }

  _filterTripEventTypes(tripEventType) {
    return this._tripEvents.filter((tripEvent) => {
      return tripEventType === tripEvent.type;
    });
  }

  renderChart() {
    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const transportCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = this.getElement().querySelector(`.statistics__chart--time`);

    // console.log(this._tripEvents);
    this._tripEventsTypes = this._getTripEventsTypes();
    this._tripEventsTypeLabels = this._getTripEventsLabels();
    // this._tripEventsTimeSpends = this._getTimeSpendFormat();

    const BAR_HEIGHT = 55;
    moneyCtx.height = BAR_HEIGHT * this._tripEventsTypeLabels.length;
    transportCtx.height = BAR_HEIGHT * this._tripEventsTypeLabels.length;
    timeSpendCtx.height = BAR_HEIGHT * this._tripEventsTypeLabels.length;

    this._moneyChart = new Chart(moneyCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._tripEventsTypeLabels,
        datasets: [{
          data: this._tripEventsTypes.map((eventType) => this._getMoneyValues(eventType)),
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `€ ${val}`
          }
        },
        title: {
          display: true,
          text: `MONEY`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`,
        },
        layout: {
          padding: {
            left: 100
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });

    this._transportChart = new Chart(transportCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._tripEventsTypeLabels,
        datasets: [{
          data: [4, 2, 1],
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `${val}x`
          }
        },
        title: {
          display: true,
          text: `TRANSPORT`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`,
        },
        layout: {
          padding: {
            left: 100
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });

    this._timeSpendChart = new Chart(timeSpendCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._tripEventsTypeLabels,
        datasets: [{
          data: [],
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `${val}x`
          }
        },
        title: {
          display: true,
          text: `TIME-SPEND`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`,
        },
        layout: {
          padding: {
            left: 100
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });
  }
}
