export type Player = {
  name: string;
  credits: number;
  shipId: string;
};

export type Game = {
  id: string;
  player: Player;
  currentPlace: string;
};

export type Ship = {
  id: string;
  name: string;
  cargoHold: number;
}