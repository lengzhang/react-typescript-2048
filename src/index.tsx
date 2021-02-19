import * as React from "react";
import { render } from "react-dom";

import Game from "./components/Game";
import Helmet from "./components/Helmet";

function App() {
  return (
    <>
      <Helmet />
      <Game />
    </>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
