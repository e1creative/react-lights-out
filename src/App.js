import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
    <div className="App">
      <Board nrows={3} ncols={3} chanceLightStartsOn={() => Math.floor(Math.random() * 10 + 1)}/>
    </div>
  );
}

export default App;
