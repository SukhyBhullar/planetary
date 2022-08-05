import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GameListPage } from "./pages/Game/GameListPage";
import { PlacePage } from "./pages/Place/PlacePage";
import { NewGamePage } from "./pages/Game/NewGamePage";
import { ResetPage } from "./pages/Debug/Reset";
import { TradePage } from "./pages/Trade/TradePage";
import { DebugPage } from "./pages/Debug/DebugPage";

export const idParam = ":id";

export const newGameRoute = "/newgame";
export const locationRoute = "/place";
export const tradeRoute = `${locationRoute}/${idParam}/trade`;
const debugRoute = "/debug";
const resetRoute = "/reset";

export const GameRoutes = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameListPage />} />
        <Route path={newGameRoute} element={<NewGamePage />} />
        <Route path={resetRoute} element={<ResetPage />} />
        <Route path={locationRoute} element={<PlacePage />} />
        <Route path={tradeRoute} element={<TradePage />} />
        <Route path={debugRoute} element={<DebugPage />} />
      </Routes>
    </BrowserRouter>
  );
};
