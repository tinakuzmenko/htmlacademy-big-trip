import moment from 'moment';
import {eventActionsMap} from '../helpers/constants.js';
import {getTimeDifference, getCapitalizedString} from '../helpers/utils.js';

export default class TripEventAdapter {
  constructor(data) {
    this.id = data[`id`];
    this.type = getCapitalizedString(data[`type`]);
    this.start = new Date(data[`date_from`]);
    this.end = new Date(data[`date_to`]);
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.basePrice = data[`base_price`];
    this.activeOffers = data[`offers`];

    this.destination = data[`destination`];
    this.destination.pictures = data[`destination`].pictures;

    this.timeDiff = getTimeDifference(this.start, this.end);
    this.parsedStartDate = Date.parse(moment(this.start).startOf(`date`));
    this.action = eventActionsMap[this.type];
  }

  toRAW(data) {
    const RAWObj = {
      'id': data.id.toString(),
      'type': data.type.toLowerCase(),
      'date_from': moment.parseZone(data.start).utc().format(),
      'date_to': moment.parseZone(data.end).utc().format(),
      'is_favorite': data.isFavorite,
      'base_price': data.basePrice,
      'offers': data.activeOffers,
      'destination': data.destination,
    };

    return RAWObj;
  }

  static parseTripEvent(data) {
    return new TripEventAdapter(data);
  }

  static parseTripEvents(data) {
    return data.map(TripEventAdapter.parseTripEvent);
  }

  static clone(data) {
    return new TripEventAdapter(data.toRAW());
  }
}
