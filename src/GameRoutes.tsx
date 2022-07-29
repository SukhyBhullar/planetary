import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GameListPage } from "./pages/GameListPage";
import { PlacePage } from "./pages/PlacePage";
import { NewGamePage } from "./pages/NewGamePage";
import { ResetPage } from "./pages/Reset";
import { TradePage } from "./pages/Trade/TradePage";
import { DebugPage } from "./pages/DebugPage";

export const idParam = ":id";

export const newGameRoute = "/newgame";
export const locationRoute = "/place";
export const tradeRoute = `${locationRoute}/${idParam}/trade`;
const debugRoute = "/debug";

export const GameRoutes = (): React.ReactElement => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameListPage />} />
        <Route path={newGameRoute} element={<NewGamePage />} />
        <Route path="/reset" element={<ResetPage />} />
        <Route path={locationRoute} element={<PlacePage />} />
        <Route path={tradeRoute} element={<TradePage />} />
        <Route path={debugRoute} element={<DebugPage />} />
      </Routes>
    </BrowserRouter>
  );
};
