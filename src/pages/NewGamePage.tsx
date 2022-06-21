import { Button, Card, Label, TextInput } from "flowbite-react";
import React, { useRef } from "react";
import { useAppDispatch } from "../app/hooks";
import { startNewGame } from "../features/game/GameSlice";
import { locationRoute } from "../GameRoutes";

export const NewGamePage: React.FC = () => {

  const dispatch = useAppDispatch();
  const playerNameRef = useRef<HTMLInputElement>(null);

  const generateId = (): string =>
  {
    return `game_${Date.now().toString()}}`
  }
  
  const createNewGame = (): void => {
    if (playerNameRef.current != null && playerNameRef.current.value !== "") {
      dispatch(startNewGame({ id: generateId(), player: { name: playerNameRef.current.value } }));
      window.location.href = locationRoute;
    }
  };

  return (
    <div className="container max-w-xl m-auto flex flex-col h-screen justify-center">
      <Card>
        <div className="flex flex-col gap-6 items-center m-5">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create your character
          </h5>
          <div className="w-96">
            <div className="mb-2 block">
              <Label htmlFor="charName" value="Name" />
            </div>
            <TextInput
              id="charName"
              placeholder="Your Name Here"
              required={true}
              ref={playerNameRef}
            />
          </div>

          <div className="flex gap-7">
            <Button onClick={createNewGame}>
              <p className="text-xl">Create</p>
            </Button>
            <Button color="failure" outline={true} href="/">
              <p className="text-xl">Cancel</p>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
