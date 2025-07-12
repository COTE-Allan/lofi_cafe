import { useCafe } from "./Provider.jsx";
import PhoneIMG from "./assets/phone.svg";
import { FaCloud, FaCloudRain } from "react-icons/fa";
import { BiFullscreen, BiExitFullscreen, BiVolumeFull } from "react-icons/bi";
import YouTube from "react-youtube";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function Phone() {
  const {
    formattedTime,
    formattedDate,
    rainMode,
    setRainMode,
    fullscreen,
    toggleFullscreen,
    volumeMusic,
    setVolumeMusic,
    volumeRain,
    setVolumeRain,
    setRainPlayer,
  } = useCafe();

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
            onClick={() => setRainMode(!rainMode)}
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
                max={80}
                value={volumeMusic}
                onChange={setVolumeMusic}
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
                onChange={setVolumeRain}
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
          onReady={(e) => setRainPlayer(e.target)}
        />
      </div>
    </div>
  );
}
export default Phone;
