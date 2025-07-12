import { createContext, useContext, useState, useEffect, useRef } from "react";

// Optionnel : mock d’un player pour éviter les erreurs en dev
const dummyPlayer = {
  playVideo: () => {},
  pauseVideo: () => {},
  setVolume: () => {},
};

const radioList = [
  { name: "lofi hip hop radio", link: "jfKfPfyJRdk" },
  { name: "synthwave radio", link: "4xDzrJKXOOY" },
  { name: "jazz lofi radio", link: "HuFYqnbVbzY" },
  { name: "video games lofi radio", link: "GluJS2IAe_s" },
  { name: "asian lofi radio", link: "Na0w3Mz46GA" },
];

const CafeContext = createContext();
export function CafeProvider({ children }) {
  // STATES
  const [volumeMusic, setVolumeMusic] = useState(50);
  const [volumeRain, setVolumeRain] = useState(50);
  const [rainMode, setRainMode] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [loading, setLoading] = useState(true);

  //   Gestion erreur
  const [playerError, setPlayerError] = useState(false);
  const [playerErrorCountdown, setPlayerErrorCountdown] = useState(3);

  // Cassette player logic
  const [isPlaying, setIsPlaying] = useState(false);
  const [radioIndex, setRadioIndex] = useState(0);
  const playerRef = useRef(null);

  // Rain player
  const rainPlayerRef = useRef(null);

  // LOGIQUE — toutes les useEffect ici !

  // Loading
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  //   Lien mort
  useEffect(() => {
    let timer;
    if (playerError) {
      setPlayerErrorCountdown(3); // Reset à 3 à chaque erreur
      timer = setInterval(() => {
        setPlayerErrorCountdown((prev) => {
          if (prev === 1) {
            // Swap la radio et reset error après 3s
            nextRadio();
            setPlayerError(false);
            return 3;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [playerError]);

  // Date/heure update
  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Fullscreen
  useEffect(() => {
    function handleFullscreenChange() {
      setFullscreen(document.fullscreenElement !== null);
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Rain mode
  useEffect(() => {
    if (rainPlayerRef.current) {
      rainMode
        ? rainPlayerRef.current.playVideo()
        : rainPlayerRef.current.pauseVideo();
    }
  }, [rainMode]);

  // Rain volume
  useEffect(() => {
    if (rainPlayerRef.current) rainPlayerRef.current.setVolume(volumeRain);
  }, [volumeRain]);

  // Music volume
  useEffect(() => {
    if (playerRef.current) playerRef.current.setVolume(volumeMusic);
  }, [volumeMusic]);

  // FORMATTING
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

  // CASSSETTE LOGIC
  function playCassette() {
    if (!isPlaying) {
      if (playerRef.current) playerRef.current.playVideo();
      setIsPlaying(true);
    }
  }
  function pauseCassette() {
    if (isPlaying) {
      if (playerRef.current) playerRef.current.pauseVideo();
      setIsPlaying(false);
    }
  }
  function nextRadio() {
    setRadioIndex((i) => (i + 1) % radioList.length);
  }
  function prevRadio() {
    setRadioIndex((i) => (i - 1 + radioList.length) % radioList.length);
  }
  function randomRadio() {
    let rand;
    do {
      rand = Math.floor(Math.random() * radioList.length);
    } while (rand === radioIndex);
    setRadioIndex(rand);
  }

  function setCassettePlayer(player) {
    playerRef.current = player || dummyPlayer;
    if (player) player.setVolume(volumeMusic);
  }
  function setRainPlayer(player) {
    rainPlayerRef.current = player || dummyPlayer;
    if (player) player.setVolume(volumeRain);
    if (rainMode && player) player.playVideo();
  }

  // FULLSCREEN
  function toggleFullscreen() {
    if (!document.fullscreenElement)
      document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  }

  // Centralise tout ce que tes composants ont besoin
  const value = {
    // state "public"
    volumeMusic,
    setVolumeMusic,
    volumeRain,
    setVolumeRain,
    rainMode,
    setRainMode,
    fullscreen,
    toggleFullscreen,
    dateTime,
    formattedTime,
    formattedDate,
    loading,
    // Cassette logic
    isPlaying,
    playCassette,
    pauseCassette,
    nextRadio,
    prevRadio,
    randomRadio,
    radioIndex,
    radioList,
    setCassettePlayer,
    // Rain
    setRainPlayer,
    // Error
    playerError,
    setPlayerError,
    playerErrorCountdown,
  };

  return <CafeContext.Provider value={value}>{children}</CafeContext.Provider>;
}
export function useCafe() {
  return useContext(CafeContext);
}
