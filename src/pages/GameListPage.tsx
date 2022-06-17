import { Button, Card } from "flowbite-react";
import React from "react";

export const GameListPage: React.FC = () => {
  return (
    <Card>
      <div className="flex flex-col gap-6 items-center m-5">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Begin your Journey
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Start a new game of Planetary
        </p>
        <Button>
          <p className="text-xl">New Game</p>
        </Button>
      </div>
    </Card>
  );
};
