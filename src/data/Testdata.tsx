import { Ship } from "../domain/Game";
import { Place } from "../domain/Place";
import { CommonMetalsCargo, FuelCargo, LiquorCargo } from "./Cargo";

export const Places: Place[] = [
  {
    id: "place_1429014821",
    name: "Base Tigra",
    description: "A military base specialising in the training of troops",
    tradeActivities: [
      {
        id: "tradeActivity_124125905",
        description: "A small trading area run my the military",
        longDescription:
          "An officer stands by the requisition desk looking bored. The trade terminal provides a list of items the station has to offer",
        availableTrades: [
          { id: "trade_414251", selling: FuelCargo, availability: 100, volatility: 10 },
          { id: "trade_414252", selling: CommonMetalsCargo, availability: 100, volatility: 10 },
        ],
      },
      {
        id: "tradeActivity_724135906",
        description: "A few soldiers running a black market",
        longDescription:
          "Although the guards seem to be in earshot three soldiers brazen ask passers by about their wares",
        availableTrades: [
          { id: "trade_135322", selling: LiquorCargo, availability: 20, volatility: 40 },
        ],
      },
    ],
  },
];

export const Ships: Ship[] = [
  {
    id: "ship_131414144141",
    name: "Greco Freighter",
    cargoHold: 1000
  }
]
