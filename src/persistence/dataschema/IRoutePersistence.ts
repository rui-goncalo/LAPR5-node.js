export interface IRoutePersistence {
  _id: string;
  routeId: string;
  origin: string;
  destination: string;
  distance: string;
  timeDistance: string;
  energySpent: string;
  extraTimeBattery: string;
}
