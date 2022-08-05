import { IPlaceService, PlaceService } from "./PlaceService";

export const PlaceServiceFactory = (): IPlaceService => {
  return new PlaceService();
};
