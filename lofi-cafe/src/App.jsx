import { useState, useEffect } from "react";
import "./style/app.scss";
import Background from "./background";
import AudioPlayer from "./audioPlayer";
import CassettePlayer from "./CassettePlayer";

function App() {
  return (
    <div className="app">
      <Background />
      <CassettePlayer />
    </div>
  );
}

export default App;
