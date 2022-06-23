import { Button, Card } from "flowbite-react";
import { currentPlace } from "../data/Testdata";
import { idParam, tradeRoute } from "../GameRoutes";

export const LocationPage: React.FC = () => {
  return (
    <>
      <p className="text-white">{currentPlace.name}</p>
      {currentPlace.tradeActivities.map((tradeActivity) => (
        <Card key={tradeActivity.description}>
          <div className="flex flex-row gap-3 justify-between items-center m-2">
            <p className="font-normal text-gray-200">
              {tradeActivity.description}
            </p>
            <Button href={tradeRoute.replace(idParam, currentPlace.id)}>
              <p className="text-xl">Trade</p>
            </Button>
          </div>
        </Card>
      ))}
    </>
  );
};
