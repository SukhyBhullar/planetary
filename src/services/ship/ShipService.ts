import { Ship } from "../../domain/Game";
import { Ships } from "../../data/Testdata";

export interface IShipService {
    GetShip(shipId: string): Ship;
}

export class ShipService implements IShipService {
  public GetShip(shipId: string): Ship {
    const ship = Ships.find((s) => s.id === shipId);
    if (ship === undefined) {
      throw new Error("ship not found");
    }
    return ship;
  }
}
