import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Cargo } from "../../domain/Cargo";

interface ShipState {
  currentShip: string | null;
  currentShipIndex: number | null;
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
  currentShipIndex: null,
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

export interface removeCargoParams {
  cargo: Cargo;
  amount: number;
}

const getCurrentShip = (state: ShipState) => {
  if (state.currentShipIndex == null) {
    throw new Error("Current game not selected");
  }
  return state.ships[state.currentShipIndex];
};

function getExistingCargo(
  state: any,
  action: { payload: addCargoParams; type: string }
) {
  return getCurrentShip(state).cargoInBay.find(
    (c) => c.cargo.name === action.payload.cargo.name
  );
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
      state.currentShip = action.payload.id;
      state.currentShipIndex = state.ships.length - 1;
    },
    setCurrentShip: (state, action: PayloadAction<string>) => {
      const selectedShip = state.ships.findIndex(
        (s) => s.id === action.payload
      );
      if (selectedShip === -1) {
        return;
      }
      state.currentShip = action.payload;
      state.currentShipIndex = selectedShip;
    },
    addCargo: (state, action: PayloadAction<addCargoParams>) => {
      if (state.currentShip == null) return;
      const existingCargo = getExistingCargo(state, action);
      if (existingCargo === undefined) {
        getCurrentShip(state).cargoInBay.push({
          amount: action.payload.amount,
          cargo: action.payload.cargo,
        });
      } else {
        existingCargo.amount += action.payload.amount;
      }

      getCurrentShip(state).cargoAmount =
        getCurrentShip(state).cargoAmount +
        action.payload.amount * action.payload.cargo.volume;
    },
    removeCargo: (state, action: PayloadAction<removeCargoParams>) => {
      const existingCargo = getExistingCargo(state, action);
      if (existingCargo === undefined) {
        throw new Error("tried to remove cargo that does not exist");
      }
      if (existingCargo.amount < action.payload.amount) {
        throw new Error(
          "tried to remove cargo but amount is greater than in bay"
        );
      }
      existingCargo.amount -= action.payload.amount;
      getCurrentShip(state).cargoInBay = getCurrentShip(
        state
      ).cargoInBay.filter((c) => c.amount !== 0);
      getCurrentShip(state).cargoAmount -=
        action.payload.amount * action.payload.cargo.volume;
    },
  },
});

export const { initiateShip, setCurrentShip, addCargo, removeCargo } =
  ShipSlice.actions;

export const getPlayerShip = (state: RootState) => getCurrentShip(state.ship);
