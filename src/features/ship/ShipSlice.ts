import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface ShipState {
  currentShip: ShipGameState | null;
  ships: ShipGameState[];
}

interface ShipGameState {
  id: string;
  shipId: string;
  cargoAmount: number;
}

const initialState: ShipState = {
  currentShip: null,
  ships: [],
};

export interface initiateShipParams {
  id: string;
  shipId: string;
}

export const ShipSlice = createSlice({
  name: "ship",
  initialState: initialState,
  reducers: {
    initiateShip: (state, action: PayloadAction<initiateShipParams>) => {
      const newShip = {
        id: action.payload.id,
        shipId: action.payload.shipId,
        cargoAmount: 0
      };
      state.ships.push(newShip);
      state.currentShip = newShip;
    },
    setCurrentShip: (state, action: PayloadAction<string>) => {
      const selectedShip = state.ships.find((s) => s.id === action.payload);
      if (selectedShip === undefined) {
        return;
      }
      state.currentShip = selectedShip;
    },
  },
});

export const { initiateShip, setCurrentShip } = ShipSlice.actions;

export const getPlayerShip = (state: RootState) => state.ship.currentShip;
