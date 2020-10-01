import "./App.css";

import React from "react";
import { BoatMap } from "./bin/components/boatMap";
import { RightPanel } from "./bin/components/rightPanel";

function App() {
  return (
    <div className="App">
      <BoatMap />
      <RightPanel />
    </div>
  );
}

export default App;
