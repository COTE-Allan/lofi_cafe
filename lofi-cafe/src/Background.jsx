import { useState, useEffect } from "react";
import CityBG from "./assets/city_skyline.png";
import { useCafe } from "./Provider.jsx";

function Background() {
  const { rainMode } = useCafe();
  const [rainIntensity, setRainIntensity] = useState(0);
  const [timeClass, setTimeClass] = useState("");
  const [showSun, setShowSun] = useState(false);
  const [showMoon, setShowMoon] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [showClouds, setShowClouds] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const hour = new Date().getHours();

      // Définir l'intensité de la pluie
      let intensity;
      if (hour >= 6 && hour < 12) {
        intensity = 50;
      } else if (hour >= 12 && hour < 18) {
        intensity = 20;
      } else {
        intensity = 100;
      }
      setRainIntensity(intensity);

      // Déterminer la classe CSS selon l'heure
      let className;
      if (hour >= 6 && hour < 9) {
        className = "morning";
        setShowSun(true);
        setShowMoon(false);
        setShowStars(false);
        setShowClouds(true);
      } else if (hour >= 9 && hour < 17) {
        className = "day";
        setShowSun(true);
        setShowMoon(false);
        setShowStars(false);
        setShowClouds(true);
      } else if (hour >= 17 && hour < 20) {
        className = "sunset";
        setShowSun(true);
        setShowMoon(false);
        setShowStars(false);
        setShowClouds(true);
      } else {
        className = "night";
        setShowSun(false);
        setShowMoon(true);
        setShowStars(true);
      }
      setTimeClass(className);
    };

    // Mettre à jour immédiatement
    updateTime();

    // Mettre à jour toutes les 30 secondes
    const interval = setInterval(updateTime, 30000);

    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`bg ${timeClass}`}>
      {showSun && <div className="sun"></div>}
      {showMoon && <div className="moon"></div>}
      {showStars && (
        <div className="stars">
          {Array.from({ length: 100 }).map((_, index) => (
            <div
              key={index}
              className="star"
              style={{
                top: `${Math.random() * 100}vh`,
                left: `${Math.random() * 100}vw`,
                animationDuration: `${Math.random() * 3 + 1}s`,
                animationDelay: `${Math.random()}s`,
              }}
            />
          ))}
        </div>
      )}
      {showClouds && (
        <div className="clouds">
          <div class="x1">
            <div class="cloud"></div>
          </div>

          <div class="x2">
            <div class="cloud"></div>
          </div>

          <div class="x3">
            <div class="cloud"></div>
          </div>

          <div class="x4">
            <div class="cloud"></div>
          </div>

          <div class="x5">
            <div class="cloud"></div>
          </div>
        </div>
      )}
      <div className="glass-panel"></div>
      {rainMode && (
        <div className="rain-container">
          {Array.from({ length: rainIntensity }).map((_, index) => (
            <div
              key={index}
              className="raindrop"
              style={{
                left: `${Math.random() * 100}vw`,
                animationDuration: `${Math.random() * 1 + 0.5}s`,
                animationDelay: `${Math.random()}s`,
              }}
            />
          ))}
        </div>
      )}
      <img className="cityBG" src={CityBG} alt="city skyline" />
    </div>
  );
}

export default Background;
