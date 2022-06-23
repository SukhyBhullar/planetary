export type Place = {
  id: string;
  name: string;
  tradeActivities: TradeActivity[];
};

export type TradeActivity = {
  description: string;
  availableTrades: Trade[];
};

export type Cargo = {
  volume: number;
  name: string;
};

export type Trade = {
  selling: Cargo;
  unitsAvailable: number;
  pricePerUnit: number;
};

export enum ActivityType {
  Trade,
  MissionHub,
  Shop,
}
