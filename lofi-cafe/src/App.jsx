import { useState, useEffect } from "react";
import "./style/app.scss";
import Background from "./Background";
import CassettePlayer from "./CassettePlayer";
import Phone from "./Phone";
import "animate.css";
import LoadingScreen from "./LoadingScreen";
import Sign from "./Sign";

function App() {
  return (
    <div className="app">
      <Sign />
      <LoadingScreen />
      <Background />
      <CassettePlayer />
      <Phone />
    </div>
  );
}

export default App;
