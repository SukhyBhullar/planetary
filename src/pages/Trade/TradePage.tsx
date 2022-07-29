import { Button, Card } from "flowbite-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { PlaceLayout } from "../../components/PlaceLayout";
import { Places } from "../../data/Testdata";
import { Trade } from "../../domain/Place";
import { selectCurrentGame } from "../../features/game/GameSlice";
import { getCycleDate } from "../../features/time/TimeSlice";
import { PriceCalculator, PriceCost } from "../../services/PriceCalculator";
import { BuyModal } from "./BuyModal";

export const TradePage: React.FC = () => {
  let { id } = useParams();

  const [buyTrade, setBuyTrade] = useState<Trade | undefined>();
  const [buyPrice, setBuyPrice] = useState<PriceCost | undefined>();

  const currentGame = useAppSelector(selectCurrentGame);
  const day = useAppSelector(getCycleDate);

  const currentPlace = Places.find((p) => p.id === currentGame?.currentPlace);

  if (currentPlace === undefined) return <p>Error</p>;

  const currentTradeActivity = currentPlace.tradeActivities.find(
    (t) => t.id === id
  );

  if (currentTradeActivity === undefined) return <p>Error</p>;

  return (
    <PlaceLayout
      title={currentPlace.name}
      subLine={currentTradeActivity.longDescription}
    >
      {currentTradeActivity.availableTrades.map((trade) => {
        const price = PriceCalculator.Calculate(trade, day);
        return (
          <Card key={trade.id}>
            <div className="flex flex-row gap-3 justify-between items-center m-2">
              <p className="font-normal text-gray-200">{trade.selling.name}</p>
              <div className="flex gap-2">
                <Button
                  color="warning"
                  onClick={() => {
                    setBuyTrade(trade);
                    setBuyPrice(price);
                  }}
                >
                  <p className="text-xl">Buy for {price.buyPrice}</p>
                </Button>
                <Button color={"purple"}>
                  <p className="text-xl">Sell for {price.sellPrice}</p>
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
      <BuyModal
        trade={buyTrade}
        price={buyPrice}
        onCloseBuy={() => {
          setBuyPrice(undefined);
          setBuyTrade(undefined);
        }}
      ></BuyModal>
    </PlaceLayout>
  );
};
