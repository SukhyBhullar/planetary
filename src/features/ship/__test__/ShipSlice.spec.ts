import { initiateShip, initiateShipParams, setCurrentShip, ShipSlice } from "../ShipSlice";

const reducer = ShipSlice.reducer;

test("No ships in state adds ship", () => {
  const id = "shipInstance_12315521";
  const shipId = "ship_12315521";
  const shipToSet: initiateShipParams = {
    id: id,
    shipId: shipId,
  };

  const result = reducer({ 
    currentShip: null,
    ships: []
  }, initiateShip(shipToSet));
  expect(result.ships).toHaveLength(1);
  expect(result.ships[0].id).toBe(id);
  expect(result.ships[0].shipId).toBe(shipId);
  expect(result.currentShip?.id).toBe(id);
});

test("Load current ship into state", () => {
    const id = "shipInstance_12315521";
    const shipId = "ship_12315521";
    const result = reducer({ 
        currentShip: null,
        ships: [{id: id, shipId: shipId, cargoAmount: 0 }]
      }, setCurrentShip(id));

    expect(result.currentShip?.id).toBe(id)
})