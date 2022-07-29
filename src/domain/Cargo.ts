export type Cargo = {
  volume: number;
  name: string;
  basePrice: number;
};

export const NullCargo: Cargo = {
  name: "Null",
  volume: 0,
  basePrice: 0,
};
