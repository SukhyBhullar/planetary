import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Game } from "../../domain/Game";

interface GameSliceState {
  Games: Game[];
  CurrentGame: string | null;
  CurrentGameIndex: number | null;
}

const initialState: GameSliceState = {
  Games: [],
  CurrentGame: null,
  CurrentGameIndex: null,
};

const getGameIndex = (id: string, arr: Game[]) => {
  const selectedGame = arr.findIndex((x) => x.id === id);
  if (selectedGame == null) {
    throw new Error("Game not found");
  }
  return selectedGame;
};

const getCurrentGame = (state: GameSliceState) => {
  if (state.CurrentGameIndex == null) {
    throw new Error("Current game not selected");
  }
  return state.Games[state.CurrentGameIndex];
};

export const GameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startNewGame: (state, action: PayloadAction<Game>) => {
      if (state.Games.some((x) => x.id === action.payload.id)) {
        return;
      }
      state.Games = [...state.Games, action.payload];
      state.CurrentGame = action.payload.id;
      state.CurrentGameIndex = getGameIndex(action.payload.id, state.Games);
    },
    startExistingGame: (state, action: PayloadAction<string>) => {
      state.CurrentGameIndex = getGameIndex(action.payload, state.Games);
      state.CurrentGame = action.payload;
    },
    moveToPlace: (state, action: PayloadAction<string>) => {
      if (state.CurrentGame == null) {
        return;
      }
      getCurrentGame(state).currentPlace = action.payload;
    },
    deductCredits: (state, action: PayloadAction<number>) => {
      if (state.CurrentGame == null) {
        return;
      }
      getCurrentGame(state).player.credits -= action.payload;
    },
    addCredits: (state, action: PayloadAction<number>) => {
      if (state.CurrentGame == null) {
        return;
      }
      getCurrentGame(state).player.credits += action.payload;
    },
  },
});

export const { startNewGame, startExistingGame, addCredits, deductCredits } =
  GameSlice.actions;

export const selectGames = (state: RootState) => state.game.Games;

export const selectCurrentGame = (state: RootState) => {
  if (state.game.CurrentGameIndex == null) {
    return null;
  }
  return state.game.Games[state.game.CurrentGameIndex];
};

export const getPlayerCredits = (state: RootState) => {
  if (state.game.CurrentGameIndex == null) {
    return null;
  }
  return state.game.Games[state.game.CurrentGameIndex].player.credits;
};
