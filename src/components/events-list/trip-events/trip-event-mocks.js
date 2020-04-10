const eventTypes = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

const eventActionsMap = {
  'Taxi': `to`,
  'Bus': `to`,
  'Train': `to`,
  'Ship': `to`,
  'Transport': `to`,
  'Drive': `to`,
  'Flight': `to`,
  'Check-in': `in`,
  'Sightseeing': `in`,
  'Restaurant': `in`,
};

const eventDestinations = [`Copenhagen`, `Longyearbyen`, `Tromsø`, `Reykjavík`, `Nuuk`, `Moscow`, `Tórshavn`];

const eventOffers = [{
  id: `luggage`,
  title: `Add luggage`,
  price: 30
},
{
  id: `comfort`,
  title: `Switch to comfort class`,
  price: 100
},
{
  id: `meal`,
  title: `Add meal`,
  price: 15
},
{
  id: `seats`,
  title: `Choose seats`,
  price: 5
},
{
  id: `train`,
  title: `Travel by train`,
  price: 40
},
{
  id: `uber`,
  title: `Order Uber`,
  price: 20
},
{
  id: `lunch`,
  title: `Lunch in city`,
  price: 30
},
{
  id: `car`,
  title: `Rent a car`,
  price: 200
},
{
  id: `tickets`,
  title: `Book tickets`,
  price: 40
},
{
  id: `breakfast`,
  title: `Add breakfast`,
  price: 50
}];

export {eventTypes, eventActionsMap, eventDestinations, eventOffers};
