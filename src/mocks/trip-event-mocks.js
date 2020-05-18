import {getPhotos} from './get-photos.js';
import {getRandomDescription} from './get-random-description.js';

const eventTypes = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

const eventDestinations = [`Copenhagen`, `Longyearbyen`, `Tromsø`, `Reykjavík`, `Nuuk`, `Moscow`, `Tórshavn`];

const eventDestinationsObjects = [
  {
    name: `Copenhagen`,
    description: getRandomDescription(),
    photos: getPhotos()
  },
  {
    name: `Longyearbyen`,
    description: getRandomDescription(),
    photos: getPhotos()
  },
  {
    name: `Tromsø`,
    description: getRandomDescription(),
    photos: getPhotos()},
  {
    name: `Reykjavík`,
    description: getRandomDescription(),
    photos: getPhotos()},
  {
    name: `Nuuk`,
    description: getRandomDescription(),
    photos: getPhotos()},
  {
    name: `Moscow`,
    description: getRandomDescription(),
    photos: getPhotos()},
  {
    name: `Tórshavn`,
    description: getRandomDescription(),
    photos: getPhotos()}
];

const eventOffers = {
  'bus': [
    {
      title: `Infotainment system`,
      price: 50
    },
    {
      title: `Order meal`,
      price: 100
    },
    {
      title: `Choose seats`,
      price: 190
    }
  ],
  'check-in': [
    {
      title: `Choose the time of check-in`,
      price: 70
    },
    {
      title: `Choose the time of check-out`,
      price: 190
    },
    {
      title: `Add breakfast`,
      price: 110
    },
    {
      title: `Laundry`,
      price: 140
    },
    {
      title: `Order a meal from the restaurant`,
      price: 30
    }
  ],
  'drive': [
    {
      title: `Choose comfort class`,
      price: 110
    },
    {
      title: `Choose business class`,
      price: 180
    }
  ],
  'flight': [
    {
      title: `Choose meal`,
      price: 120
    },
    {
      title: `Choose seats`,
      price: 90
    },
    {
      title: `Upgrade to comfort class`,
      price: 120
    },
    {
      title: `Upgrade to business class`,
      price: 120
    },
    {
      title: `Add luggage`,
      price: 170
    },
    {
      title: `Business lounge`,
      price: 160
    }
  ],
  'restaurant': [
    {
      title: `Choose live music`,
      price: 150
    },
    {
      title: `Choose VIP area`,
      price: 70
    }
  ],
  'ship': [
    {
      title: `Choose meal`,
      price: 130
    },
    {
      title: `Choose seats`,
      price: 160
    },
    {
      title: `Upgrade to comfort class`,
      price: 170
    },
    {
      title: `Upgrade to business class`,
      price: 150
    },
    {
      title: `Add luggage`,
      price: 100
    },
    {
      title: `Business lounge`,
      price: 40
    }
  ],
  'sightseeing': null,
  'taxi': [
    {
      title: `Upgrade to a business class`,
      price: 190
    },
    {
      title: `Choose the radio station`,
      price: 30
    },
    {
      title: `Choose temperature`,
      price: 170
    },
    {
      title: `Drive quickly, I'm in a hurry`,
      price: 100
    },
    {
      title: `Drive slowly`,
      price: 110
    }
  ],
  'train': [
    {
      title: `Book a taxi at the arrival point`,
      price: 110
    },
    {
      title: `Order a breakfast`,
      price: 80
    },
    {
      title: `Wake up at a certain time`,
      price: 140
    }
  ],
  'transport': null
};

export {eventTypes, eventDestinations, eventOffers, eventDestinationsObjects};
