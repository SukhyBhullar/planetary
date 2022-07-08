export type Place = {
  id: string;
  name: string;
  description: string;
  tradeActivities: TradeActivity[];
};

export type TradeActivity = {
  id: string;
  description: string;
  longDescription: string;
  availableTrades: Trade[];
};

export type Cargo = {
  volume: number;
  name: string;
  basePrice: number;
};

export type Trade = {
  id: string;
  selling: Cargo;
  availability: number;
  volatility: number;
};

export enum ActivityType {
  Trade,
  MissionHub,
  Shop,
}
