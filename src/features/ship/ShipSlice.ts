import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Cargo } from "../../domain/Place";

interface ShipState {
  currentShip: ShipGameState | null;
  ships: ShipGameState[];
}

type CargoSections = {
  cargo: Cargo;
  amount: number;
};

interface ShipGameState {
  id: string;
  shipId: string;
  cargoAmount: number;
  cargoInBay: CargoSections[];
}

const initialState: ShipState = {
  currentShip: null,
  ships: [],
};

export interface initiateShipParams {
  id: string;
  shipId: string;
}

export interface addCargoParams {
  cargo: Cargo;
  amount: number;
}

export const ShipSlice = createSlice({
  name: "ship",
  initialState: initialState,
  reducers: {
    initiateShip: (state, action: PayloadAction<initiateShipParams>) => {
      const newShip = {
        id: action.payload.id,
        shipId: action.payload.shipId,
        cargoAmount: 0,
        cargoInBay: [],
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
    addCargo: (state, action: PayloadAction<addCargoParams>) => {
      if (state.currentShip == null) return;
      const existingCargo = state.currentShip.cargoInBay.find(
        (c) => c.cargo.name === action.payload.cargo.name
      );
      if (existingCargo === undefined) {
        state.currentShip.cargoInBay.push({
          amount: action.payload.amount,
          cargo: action.payload.cargo,
        });
      } else {
        existingCargo.amount += action.payload.amount;
      }

      state.currentShip.cargoAmount +=
        action.payload.amount * action.payload.cargo.volume;
    },
  },
});

export const { initiateShip, setCurrentShip, addCargo } = ShipSlice.actions;

export const getPlayerShip = (state: RootState) => state.ship.currentShip;
