import { useState, useEffect } from "react";
import PhoneIMG from "./assets/phone.svg";
import "./style/phone.scss";
import { FaCloud, FaCloudRain } from "react-icons/fa";
import {
  BiFullscreen,
  BiExitFullscreen,
  BiVolume,
  BiVolumeFull,
} from "react-icons/bi";
import YouTube from "react-youtube";
import useSound from "use-sound";
import pressSfx from "./assets/interface_press.mp3";
import Slider from "rc-slider"; // Nouveau slider

import "rc-slider/assets/index.css"; // Import des styles du slider

function Phone({ volumeMusic, setVolumeMusic }) {
  const [dateTime, setDateTime] = useState(new Date());
  const [rainMode, setRainMode] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [rainPlayer, setRainPlayer] = useState(null);
  const [volumeRain, setVolumeRain] = useState(50); // État pour le volume
  const [press] = useSound(pressSfx, { volume: 0.3 });

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleFullscreenChange() {
      setFullscreen(document.fullscreenElement !== null);
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    press();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Erreur lors de l'activation du plein écran :", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const formattedTime = dateTime.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = dateTime.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    if (rainPlayer) {
      if (rainMode) {
        rainPlayer.playVideo();
      } else {
        rainPlayer.pauseVideo();
      }
    }
  }, [rainMode]);

  useEffect(() => {
    if (rainPlayer) {
      rainPlayer.setVolume(volumeRain);
    }
  }, [volumeRain]);

  return (
    <div className="phone-container">
      <div className="phone">
        <img src={PhoneIMG} alt="Téléphone" />
        <div className="phone-info">
          <p className="time">{formattedTime}</p>
          <p className="date">{formattedDate}</p>
        </div>
        <div className="phone-control">
          <div
            className="phone-control-button weather"
            onClick={() => {
              press();
              setRainMode(!rainMode);
            }}
          >
            {rainMode ? <FaCloudRain size={40} /> : <FaCloud size={40} />}
            Rain sounds {rainMode ? "on" : "off"}
          </div>
          <div
            className="phone-control-button fullscreen"
            onClick={toggleFullscreen}
          >
            {fullscreen ? (
              <BiExitFullscreen size={40} />
            ) : (
              <BiFullscreen size={40} />
            )}
            Fullscreen {!fullscreen ? "off" : "on"}
          </div>
          <div className="volume-slider-container">
            <div className="volume-slider">
              <p>
                <BiVolumeFull /> Music
              </p>
              <Slider
                min={0}
                max={100}
                value={volumeMusic}
                onChange={(value) => setVolumeMusic(value)}
                trackStyle={{ backgroundColor: "#fff", height: 7 }}
                handleStyle={{
                  borderColor: "#fff",
                  height: 20,
                  width: 20,
                  backgroundColor: "#fff",
                }}
              />
            </div>
            <div className="volume-slider">
              <p>
                <BiVolumeFull /> Rain
              </p>
              <Slider
                min={0}
                max={100}
                value={volumeRain}
                onChange={(value) => setVolumeRain(value)}
                trackStyle={{ backgroundColor: "#fff", height: 7 }}
                handleStyle={{
                  borderColor: "#fff",
                  height: 20,
                  width: 20,
                  backgroundColor: "#fff",
                }}
              />
            </div>
          </div>
        </div>

        <YouTube
          videoId="-OekvEFm1lo"
          style={{ display: "none" }}
          className="iframeYoutube"
          onReady={(e) => {
            setRainPlayer(e.target);
            e.target.setVolume(volumeRain);
            if (rainMode) e.target.playVideo();
          }}
        />
      </div>
    </div>
  );
}

export default Phone;
