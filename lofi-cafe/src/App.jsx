import { useState, useEffect } from "react";
import "./style/app.scss";
import Background from "./Background";
import CassettePlayer from "./CassettePlayer";
import Phone from "./Phone";
import "animate.css";
import LoadingScreen from "./LoadingScreen";
import Sign from "./Sign";

function App() {
  const [volumeMusic, setVolumeMusic] = useState(50);
  return (
    <div className="app">
      <Sign />
      <LoadingScreen />
      <Background />
      <CassettePlayer
        volumeMusic={volumeMusic}
        setVolumeMusic={setVolumeMusic}
      />
      <Phone volumeMusic={volumeMusic} setVolumeMusic={setVolumeMusic} />
    </div>
  );
}

export default App;
