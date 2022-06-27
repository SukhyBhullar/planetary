import { Button, Card } from "flowbite-react";
import { useAppSelector } from "../app/hooks";
import { PlaceLayout } from "../components/PlaceLayout";
import { Places } from "../data/Testdata";
import { selectCurrentGame } from "../features/game/GameSlice";
import { idParam, tradeRoute } from "../GameRoutes";

export const PlacePage: React.FC = () => {
  const currentGame = useAppSelector(selectCurrentGame);

  const currentPlace = Places.find((p) => p.id === currentGame?.currentPlace);

  if (currentPlace === undefined) return <p>Error</p>;

  return (
    <PlaceLayout title={currentPlace.name} subLine={currentPlace.description}>
       {currentPlace.tradeActivities.map((tradeActivity) => (
        <Card key={tradeActivity.id}>
          <div className="flex flex-row gap-3 justify-between items-center m-2">
            <p className="font-normal text-gray-200">
              {tradeActivity.description}
            </p>
            <Button href={tradeRoute.replace(idParam, tradeActivity.id)}>
              <p className="text-xl">Trade</p>
            </Button>
          </div>
        </Card>
      ))}
    </PlaceLayout>
  );
};
