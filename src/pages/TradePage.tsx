import { Button, Card } from "flowbite-react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { PlaceLayout } from "../components/PlaceLayout";
import { Places } from "../data/Testdata";
import { selectCurrentGame } from "../features/game/GameSlice";

export const TradePage: React.FC = () => {
  let { id } = useParams();

  const currentGame = useAppSelector(selectCurrentGame);

  const currentPlace = Places.find((p) => p.id === currentGame?.currentPlace);

  if (currentPlace === undefined) return <p>Error</p>;

  const currentTradeActivity = currentPlace.tradeActivities.find(
    (t) => t.id === id
  );

  if (currentTradeActivity === undefined) return <p>Error</p>;

  return (
    <PlaceLayout title={currentPlace.name} subLine={currentTradeActivity.longDescription}>
       {currentTradeActivity.availableTrades.map((trade) => (
        <Card key={trade.id}>
          <div className="flex flex-row gap-3 justify-between items-center m-2">
            <p className="font-normal text-gray-200">
              {trade.selling.name}
            </p>
            <Button>
              <p className="text-xl">Trade</p>
            </Button>
          </div>
        </Card>
      ))}
    </PlaceLayout>
  );
};
