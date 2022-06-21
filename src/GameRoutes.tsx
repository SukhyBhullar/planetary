import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GameListPage } from "./pages/GameListPage";
import { LocationPage } from "./pages/LocationPage";
import { NewGamePage } from "./pages/NewGamePage";
import { ResetPage } from "./pages/Reset";

export const newGameRoute = "/newgame";
export const locationRoute = "/location";

export const GameRoutes = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameListPage />} />
        <Route path={newGameRoute} element={<NewGamePage />} />
        <Route path="/reset" element={<ResetPage />} />
        <Route path={locationRoute} element={<LocationPage />} />
      </Routes>
    </BrowserRouter>
  );
};
