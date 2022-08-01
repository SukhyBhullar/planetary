import { Button, Label, Modal, TextInput } from "flowbite-react";
import { ModalBody } from "flowbite-react/lib/esm/components/Modal/ModalBody";
import { ModalHeader } from "flowbite-react/lib/esm/components/Modal/ModalHeader";
import { deNull } from "../../util/denull";
import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { Trade } from "../../domain/Place";
import { Cargo, NullCargo } from "../../domain/Cargo";
import { PriceCost } from "../../services/PriceCalculator";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ShipServiceFactory } from "../../services/ship/ShipServiceFactory";
import { getPlayerShip, removeCargo } from "../../features/ship/ShipSlice";
import { addCredits } from "../../features/game/GameSlice";

export interface props {
  trade: Trade | undefined;
  price: PriceCost | undefined;
  onCloseSell?: () => void;
}

export const SellModal: React.FC<props> = ({ trade, price, onCloseSell }) => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [modalTrade, setTrade] = useState<Trade | undefined>();
  const [modalPrice, setPrice] = useState<PriceCost | undefined>();
  const [modalAmount, setModalAmount] = useState<number | undefined>();

  const modalSellAmount = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const shipState = useAppSelector(getPlayerShip);

  useEffect(() => {
    if (trade == null) {
      return;
    }

    if (price == null) {
      return;
    }
    OpenSellModal(trade, price);
  });

  const shipBase = ShipServiceFactory().GetShip(shipState.shipId);

  if (shipState == null) {
    throw new Error("ship state is null");
  }

  function OpenSellModal(trade: Trade, price: PriceCost): void {
    setTrade(trade);
    setOpenModal("SellModal");
    setPrice(price);
  }

  function CloseSellModal() {
    zeroSellModal();

    if (onCloseSell) onCloseSell();

    setOpenModal(undefined);
  }

  function zeroSellModal() {
    if (modalSellAmount.current) modalSellAmount.current.value = "0";
    setModalAmount(0);
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
    const cargoAmountInBay = deNull(
      shipState.cargoInBay.find((c) => c.cargo.name === trade?.selling.name)
        ?.amount,
      0
    );

    amount = Math.min(amount, cargoAmountInBay);

    event.currentTarget.value = amount.toString();

    setModalAmount(amount);
  };

  const sellCargo = (cargo: Cargo, price: number, amount: number) => {
    dispatch(addCredits(price * amount));
    dispatch(removeCargo({ amount: amount, cargo: cargo }));
    zeroSellModal();
  };

  return (
    <Modal
      show={openModal === "SellModal"}
      onClose={() => {
        CloseSellModal();
      }}
    >
      <ModalHeader>
        Sell {modalTrade?.selling.name} for {modalPrice?.sellPrice} UC
      </ModalHeader>
      <ModalBody>
        <div className="flex flex-col items-center">
          <p className="font-normal text-gray-200 text-xl">
            Cargo space{" "}
            {shipState.cargoAmount -
              deNull(modalAmount, 0) * deNull(modalTrade?.selling.volume, 0)}
            /{shipBase.cargoHold}
          </p>
          <p className="font-normal text-gray-200 text-xl">
            Cost {deNull(modalPrice?.sellPrice, 0) * deNull(modalAmount, 0)}
          </p>
          <div className="mt-4 mb-2 flex gap-4 items-center">
            <Label htmlFor="sellCargoAmount" value="Amount" />

            <TextInput
              id="sellCargoAmount"
              type="number"
              required={true}
              className="w-28"
              defaultValue={0}
              onChange={setAmount}
              min={0}
              ref={modalSellAmount}
            />
          </div>
        </div>
      </ModalBody>
      <Modal.Footer>
        <div className="flex justify-center min-w-full gap-10">
          <Button
            color="success"
            onClick={() =>
              sellCargo(
                deNull(modalTrade?.selling, NullCargo),
                deNull(modalPrice?.sellPrice, 0),
                deNull(modalAmount, 0)
              )
            }
          >
            <div className="text-xl w-20">Sell</div>
          </Button>
          <Button
            color="failure"
            onClick={() => {
              CloseSellModal();
            }}
          >
            <div className="text-xl w-20">Close</div>
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
