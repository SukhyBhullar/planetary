import { Cargo } from "../../../domain/Place";
import {
  addCargo,
  initiateShip,
  initiateShipParams,
  setCurrentShip,
  ShipSlice,
} from "../ShipSlice";

const reducer = ShipSlice.reducer;

const TestCargo: Cargo = {
  volume: 10,
  name: "Test",
  basePrice: 100,
};

const OtherCargo: Cargo = {
  volume: 10,
  name: "Other",
  basePrice: 100,
};

test("No ships in state adds ship", () => {
  const id = "shipInstance_12315521";
  const shipId = "ship_12315521";
  const shipToSet: initiateShipParams = {
    id: id,
    shipId: shipId,
  };

  const result = reducer(
    {
      currentShip: null,
      ships: [],
    },
    initiateShip(shipToSet)
  );
  expect(result.ships).toHaveLength(1);
  expect(result.ships[0].id).toBe(id);
  expect(result.ships[0].shipId).toBe(shipId);
  expect(result.currentShip?.id).toBe(id);
});

test("Load current ship into state", () => {
  const id = "shipInstance_12315521";
  const shipId = "ship_12315521";
  const result = reducer(
    {
      currentShip: null,
      ships: [{ id: id, shipId: shipId, cargoAmount: 0, cargoInBay: [] }],
    },
    setCurrentShip(id)
  );

  expect(result.currentShip?.id).toBe(id);
});

test("Add cargo to empty bay", () => {
  const id = "shipInstance_12315521";
  const shipId = "ship_12315521";
  const result = reducer(
    {
      currentShip: {
        id: id,
        shipId: shipId,
        cargoAmount: 0,
        cargoInBay: [],
      },
      ships: [],
    },
    addCargo({ amount: 10, cargo: TestCargo })
  );

  expect(result.currentShip?.cargoInBay).toContainEqual({
    cargo: TestCargo,
    amount: 10,
  });
  expect(result.currentShip?.cargoAmount).toBe(100);
});

test("Add cargo to bay with other cargo", () => {
  const id = "shipInstance_12315521";
  const shipId = "ship_12315521";
  const result = reducer(
    {
      currentShip: {
        id: id,
        shipId: shipId,
        cargoAmount: 200,
        cargoInBay: [{ amount: 20, cargo: OtherCargo }],
      },
      ships: [],
    },
    addCargo({ amount: 10, cargo: TestCargo })
  );

  expect(result.currentShip?.cargoInBay).toContainEqual({
    cargo: TestCargo,
    amount: 10,
  });
  expect(result.currentShip?.cargoInBay).toContainEqual({
    cargo: OtherCargo,
    amount: 20,
  });
  expect(result.currentShip?.cargoAmount).toBe(300);
});

test("Add cargo to bay with existing cargo", () => {
  const id = "shipInstance_12315521";
  const shipId = "ship_12315521";
  const result = reducer(
    {
      currentShip: {
        id: id,
        shipId: shipId,
        cargoAmount: 300,
        cargoInBay: [
          { amount: 20, cargo: OtherCargo },
          { cargo: TestCargo, amount: 10 },
        ],
      },
      ships: [],
    },
    addCargo({ amount: 15, cargo: TestCargo })
  );

  expect(result.currentShip?.cargoInBay).toContainEqual({
    cargo: TestCargo,
    amount: 25,
  });
  expect(result.currentShip?.cargoInBay).toContainEqual({
    cargo: OtherCargo,
    amount: 20,
  });
  expect(result.currentShip?.cargoAmount).toBe(450);
});
