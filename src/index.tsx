import * as React from "react";
import { render } from "react-dom";

import Game from "./components/Game";

function App() {
  return <Game />;
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
