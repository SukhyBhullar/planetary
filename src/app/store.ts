import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { GameSlice } from "../features/game/GameSlice";
import { ShipSlice } from "../features/ship/ShipSlice";
import { TimeSlice } from "../features/time/TimeSlice";

const saveState = (state: any) => {
  const serializedState = JSON.stringify(state);
  window.localStorage.setItem("app_state", serializedState);
};

const loadState = () => {
  try {
    const serializedState = window.localStorage.getItem("app_state");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const oldState = loadState();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    game: GameSlice.reducer,
    time: TimeSlice.reducer,
    ship: ShipSlice.reducer,
  },
  preloadedState: oldState,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

store.subscribe(() => {
  saveState(store.getState());
});
