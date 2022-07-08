import { Trade } from "../domain/Place";
import { Rand } from "./Rand";

export type PriceCost = {
  sellPrice: number;
  buyPrice: number;
};

export class PriceCalculator {
  public static Calculate(
    trade: Trade,
    day: number
  ): PriceCost {
    const r = new Rand(day);

    const v = r.range(0, trade.volatility) / 100;

    const a = r.range(0, trade.availability) / 100;

    const bp = trade.selling.basePrice - trade.selling.basePrice * a;

    const vp = bp + bp * v;

    const markup = r.range(5, v * 30) / 100;

    return { sellPrice: Math.ceil(vp), buyPrice: Math.ceil(vp + vp * markup) };
  }
}
