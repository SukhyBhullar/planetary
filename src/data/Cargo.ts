import { Cargo } from "../domain/Place";

export const FuelCargo: Cargo = {
  name: "Fuel",
  volume: 1,
  basePrice: 10,
};

export const LiquorCargo: Cargo = {
  name: "Liquor",
  volume: 1,
  basePrice: 100,
};

export const CommonMetalsCargo: Cargo = {
  name: "Common metals",
  volume: 10,
  basePrice: 60,
};
