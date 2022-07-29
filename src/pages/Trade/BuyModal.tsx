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
import { addCargo, getPlayerShip } from "../../features/ship/ShipSlice";
import { deductCredits } from "../../features/game/GameSlice";

export interface props {
  trade: Trade | undefined;
  price: PriceCost | undefined;
  onCloseBuy?: () => void;
}

export const BuyModal: React.FC<props> = ({ trade, price, onCloseBuy }) => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [modalTrade, setTrade] = useState<Trade | undefined>();
  const [modalPrice, setPrice] = useState<PriceCost | undefined>();
  const [modalAmount, setModalAmount] = useState<number | undefined>();

  const modalBuyAmount = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const shipState = useAppSelector(getPlayerShip);

  useEffect(() => {
    if (trade == null) {
      return;
    }

    if (price == null) {
      return;
    }
    OpenBuyModal(trade, price);
  });

  const shipBase = ShipServiceFactory().GetShip(shipState.shipId);

  if (shipState == null) {
    throw new Error("ship state is null");
  }

  function OpenBuyModal(trade: Trade, price: PriceCost): void {
    setTrade(trade);
    setOpenModal("BuyModal");
    setPrice(price);
  }

  function CloseBuyModal() {
    zeroBuyModal();

    if (onCloseBuy) onCloseBuy();

    setOpenModal(undefined);
  }

  function zeroBuyModal() {
    if (modalBuyAmount.current) modalBuyAmount.current.value = "0";
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
    const maxPossible =
      (shipBase.cargoHold - deNull(shipState?.cargoAmount, 0)) /
      deNull(modalTrade?.selling.volume, 0);

    amount = Math.min(amount, maxPossible);

    event.currentTarget.value = amount.toString();

    setModalAmount(amount);
  };

  const buyCargo = (cargo: Cargo, price: number, amount: number) => {
    dispatch(deductCredits(price * amount));
    dispatch(addCargo({ amount: amount, cargo: cargo }));
    zeroBuyModal();
  };

  return (
    <Modal
      show={openModal === "BuyModal"}
      onClose={() => {
        CloseBuyModal();
      }}
    >
      <ModalHeader>
        Buy {modalTrade?.selling.name} for {modalPrice?.buyPrice} UC
      </ModalHeader>
      <ModalBody>
        <div className="flex flex-col items-center">
          <p className="font-normal text-gray-200 text-xl">
            Cargo space{" "}
            {shipState.cargoAmount +
              deNull(modalAmount, 0) * deNull(modalTrade?.selling.volume, 0)}
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
              ref={modalBuyAmount}
            />
          </div>
        </div>
      </ModalBody>
      <Modal.Footer>
        <div className="flex justify-center min-w-full gap-10">
          <Button
            color="success"
            onClick={() =>
              buyCargo(
                deNull(modalTrade?.selling, NullCargo),
                deNull(modalPrice?.buyPrice, 0),
                deNull(modalAmount, 0)
              )
            }
          >
            <div className="text-xl w-20">Buy</div>
          </Button>
          <Button
            color="failure"
            onClick={() => {
              CloseBuyModal();
            }}
          >
            <div className="text-xl w-20">Close</div>
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
