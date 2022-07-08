import { IShipService, ShipService } from "./ShipService";

export const ShipServiceFactory = (): IShipService => {
    return new ShipService()
}