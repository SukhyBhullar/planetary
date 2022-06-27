export type Player = {
  name: string;
  credits: number;
};

export type Game = {
  id: string;
  player: Player;
  currentPlace: string;
};
