import "./App.css";

import { BoatMap } from "./components/boatMap";
import React from "react";
import RightPanel from "./components/rightPanel";

function App() {
  return (
    <div className="App">
      <BoatMap />
      <RightPanel />
    </div>
  );
}

export default App;
