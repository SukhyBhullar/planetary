import { Button, Card } from "flowbite-react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCurrentGame, selectGames, startExistingGame } from "../../features/game/GameSlice";
import { setCurrentShip } from "../../features/ship/ShipSlice";
import { locationRoute, newGameRoute } from "../../GameRoutes";

export const GameListPage: React.FC = () => {
  const existingGames = useAppSelector(selectGames);
  const currentGame = useAppSelector(selectCurrentGame);
  const dispatch = useAppDispatch();

  const startGame = (id: string) => {
    dispatch(startExistingGame(id));
    if(currentGame != null)
    {
      dispatch(setCurrentShip(currentGame.player.shipId))
      window.location.href = locationRoute;
    }
  };

  return (
    <div className="container max-w-sm m-auto flex flex-col h-screen justify-center">
      <h5 className="text-2xl mx-auto my-2 font-bold tracking-tight text-gray-200">
        Begin your Journey
      </h5>
      {existingGames.map((game) => (
        <Card key={game.id} color="">
          <div className="flex flex-row gap-3 justify-between items-center m-2">
            <p className="font-normal text-gray-200">{game.player.name}</p>
            <Button onClick={() => startGame(game.id)}>
              <p className="text-xl">Load Game</p>
            </Button>
          </div>
        </Card>
      ))}
      <Card>
        <div className="flex flex-col gap-6 items-center m-5">
          <p className="font-normal  text-gray-200">
            Start a new game of Planetary
          </p>
          <Button href={newGameRoute}>
            <p className="text-xl">New Game</p>
          </Button>
        </div>
      </Card>
    </div>
  );
};
