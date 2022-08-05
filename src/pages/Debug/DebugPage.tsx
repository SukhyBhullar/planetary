import { Trade } from "../../domain/Place";
import { PriceCalculator } from "../../services/PriceCalculator";

const makeTrade = (availability: number, volatility: number): Trade => {
  const cargo = { name: "test", volume: 10, basePrice: 100 };
  return {
    id: "test",
    selling: cargo,
    availability: availability,
    volatility: volatility,
  };
};

export const DebugPage: React.FC = () => {
  const days = [1, 2, 3, 4, 5, 6, 7];

  const availabilities = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];
  const volatility = 10;
  return (
    <>
      {availabilities.map((availability) => (
        <div className="flex gap-5">
          {days.map((day) => (
            <div className="text-white">
              <p>Day: {day}</p>
              <p>
                Buy:{" "}
                {
                  PriceCalculator.Calculate(
                    makeTrade(availability, volatility),
                    day
                  ).buyPrice
                }
              </p>
              <p>
                Sell:{" "}
                {
                  PriceCalculator.Calculate(
                    makeTrade(availability, volatility),
                    day
                  ).sellPrice
                }
              </p>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
