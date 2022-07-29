import { Cargo } from "./Cargo";

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
