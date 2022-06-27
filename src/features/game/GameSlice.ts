import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Game } from "../../domain/Game";

interface GameSliceState {
  Games: Game[];
  CurrentGame: Game | null;
}

const initialState: GameSliceState = {
  Games: [],
  CurrentGame: null,
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
      state.CurrentGame = action.payload;
    },
    startExistingGame: (state, action: PayloadAction<string>) => {
      const selectedGame = state.Games.find((x) => x.id === action.payload);
      if (selectedGame == null) {
        return;
      }
      state.CurrentGame = selectedGame;
    },
    moveToPlace: (state, action: PayloadAction<string>) => {
      if (state.CurrentGame == null) {
        return;
      }
      state.CurrentGame.currentPlace = action.payload;
    },
  },
});

export const { startNewGame, startExistingGame } = GameSlice.actions;

export const selectGames = (state: RootState) => state.game.Games;

export const selectCurrentGame = (state: RootState) => state.game.CurrentGame;
