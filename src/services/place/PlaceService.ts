import { Places } from "../../data/Testdata";
import { Place } from "../../domain/Place";


export interface IPlaceService
{
    GetPlace(placeId: string): Place
}

export class PlaceService implements IPlaceService {
    public GetPlace(placeId: string): Place {
      const place = Places.find((p) => p.id === placeId);
      if (place === undefined) {
        throw new Error("place not found");
      }
      return place;
    }
  }
  