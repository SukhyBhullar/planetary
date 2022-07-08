import { Button, Card, Label, Modal, TextInput } from "flowbite-react";
import { ModalBody } from "flowbite-react/lib/esm/components/Modal/ModalBody";
import { ModalHeader } from "flowbite-react/lib/esm/components/Modal/ModalHeader";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { PlaceLayout } from "../components/PlaceLayout";
import { Places } from "../data/Testdata";
import { Trade } from "../domain/Place";
import { selectCurrentGame } from "../features/game/GameSlice";
import { getPlayerShip } from "../features/ship/ShipSlice";
import { getCycleDate } from "../features/time/TimeSlice";
import { PriceCalculator, PriceCost } from "../services/PriceCalculator";
import { ShipServiceFactory } from "../services/ship/ShipServiceFactory";
import { deNull } from "../util/denull";

export const TradePage: React.FC = () => {
  let { id } = useParams();
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [modalTrade, setTrade] = useState<Trade | undefined>();
  const [modalPrice, setPrice] = useState<PriceCost | undefined>();
  const [modalAmount, setModalAmount] = useState<number | undefined>();

  const currentGame = useAppSelector(selectCurrentGame);
  const day = useAppSelector(getCycleDate);
  const shipState = useAppSelector(getPlayerShip);

  function OpenBuyModal(trade: Trade, price: PriceCost): void {
    setTrade(trade);
    setOpenModal("BuyModal");
    setPrice(price);
  }

  const setAmount: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    let amount: number = parseInt(event.currentTarget.value);
    if (isNaN(amount)) {
      amount = 0;
    }

    if (amount < 0) {
      amount = 0;
    }
    const maxPossible =
      (shipBase.cargoHold - deNull(shipState?.cargoAmount, 0)) /
      deNull(modalTrade?.selling.volume, 0);

    amount = Math.min(amount, maxPossible);

    event.currentTarget.value = amount.toString();

    setModalAmount(amount);
  };

  if (shipState == null) {
    throw new Error("ship state is null");
  }
  const shipBase = ShipServiceFactory().GetShip(shipState.shipId);

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
                  onClick={() => OpenBuyModal(trade, price)}
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
      <Modal
        show={openModal === "BuyModal"}
        onClose={() => setOpenModal(undefined)}
      >
        <ModalHeader>
          Buy {modalTrade?.selling.name} for {modalPrice?.buyPrice} UC
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col items-center">
            <p className="font-normal text-gray-200 text-xl">
              Cargo space{" "}
              {(shipState.cargoAmount + deNull(modalAmount, 0)) *
                deNull(modalTrade?.selling.volume, 0)}
              /{shipBase.cargoHold}
            </p>
            <p className="font-normal text-gray-200 text-xl">
              Cost {deNull(modalPrice?.buyPrice, 0) * deNull(modalAmount, 0)}
            </p>
            <div className="mt-4 mb-2 flex gap-4 items-center">
              <Label htmlFor="buyCargoAmount" value="Amount" />

              <TextInput
                id="buyCargoAmount"
                type="number"
                required={true}
                className="w-28"
                defaultValue={0}
                onChange={setAmount}
                min={0}
              />
            </div>
          </div>
        </ModalBody>
        <Modal.Footer>
          <div className="flex justify-center min-w-full gap-10">
            <Button color="success" onClick={() => setOpenModal(undefined)}>
              <div className="text-xl w-20">Buy</div>
            </Button>
            <Button color="failure" onClick={() => setOpenModal(undefined)}>
              <div className="text-xl w-20">Sell</div>
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </PlaceLayout>
  );
};
