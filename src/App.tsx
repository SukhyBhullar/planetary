import { Header } from "./components/NavBar";
import { GameRoutes } from "./GameRoutes";

function App(): JSX.Element {
  document.documentElement.classList.add('dark')
  return (
    <>
      <Header />
      <GameRoutes />
    </>
  );
}

export default App;
