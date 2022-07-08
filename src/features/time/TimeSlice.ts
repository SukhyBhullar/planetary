import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface TimeSliceState {
  CurrentCycle: number;
  CurrentCycleDesc: string;
}

const initialState: TimeSliceState = {
  CurrentCycle: 1,
  CurrentCycleDesc: "92.267.0",
};

export const TimeSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    addCycles: (state, action: PayloadAction<number>) => {
        state.CurrentCycle = state.CurrentCycle + action.payload;
        
        const year = Math.floor((state.CurrentCycle + 267) / 350) + 92
        const day = (state.CurrentCycle + 267) % 350
        state.CurrentCycleDesc = `${year}.${day}.0`
    },
  },
});

export const { addCycles } = TimeSlice.actions;

export const getCycleDate = (state: RootState) => state.time.CurrentCycle;