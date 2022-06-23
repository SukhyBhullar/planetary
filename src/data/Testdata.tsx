import { Cargo, Place } from "../domain/Place";

const FuelCargo: Cargo = {
  name: "Fuel",
  volume: 1,
};
export const currentPlace: Place = {
  id: "place_1429014821",
  name: "Base Tigra",
  tradeActivities: [
    {
      description: "A small trading area run my the military",
      availableTrades: [
        { selling: FuelCargo, pricePerUnit: 10, unitsAvailable: 1000 },
      ],
    },
  ],
};
