import moment from 'moment';
import {getCapitalizedText} from '../helpers/utils.js';

export default class TripEventAdapter {
  constructor(serverData) {
    this.id = serverData[`id`];
    this.type = getCapitalizedText(serverData[`type`]);
    this.start = new Date(serverData[`date_from`]);
    this.end = new Date(serverData[`date_to`]);
    this.isFavorite = Boolean(serverData[`is_favorite`]);
    this.basePrice = serverData[`base_price`];
    this.activeOffers = serverData[`offers`];

    this.destination = serverData[`destination`];
    this.destination.pictures = serverData[`destination`].pictures;
  }

  toRAW(localData) {
    const localDataRAW = {
      'id': localData.id.toString(),
      'type': localData.type.toLowerCase(),
      'date_from': moment.parseZone(localData.start).utc().format(),
      'date_to': moment.parseZone(localData.end).utc().format(),
      'is_favorite': localData.isFavorite,
      'base_price': localData.basePrice,
      'offers': localData.activeOffers,
      'destination': localData.destination,
    };

    return localDataRAW;
  }

  static parseTripEvent(tripEvent) {
    return new TripEventAdapter(tripEvent);
  }

  static parseTripEvents(tripEvents) {
    return tripEvents.map(TripEventAdapter.parseTripEvent);
  }
}
