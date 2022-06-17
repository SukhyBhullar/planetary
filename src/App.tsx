import { Header } from "./components/NavBar";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GameListPage } from "./pages/GameListPage";

const GameRoutes = (): React.ReactElement => {
  return (
    <Routes>
      <Route key="gamelistpage" path="/" element={<GameListPage />} />
    </Routes>
  );
}

function App(): JSX.Element {
  return (
    <>
    <Header />
      <div className="container max-w-sm m-auto flex flex-col h-screen justify-center">
    <BrowserRouter>
      <GameRoutes/>
    </BrowserRouter>
    </div>
    </>
  );
}

export default App;
