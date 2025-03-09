import "./style/audioPlayer.scss";
import Slider from "react-input-slider";
import { useState, useEffect } from "react";
import { BsPlayFill, BsFillPauseFill } from "react-icons/bs";
import YouTube from "react-youtube";

export default function AudioPlayer(props) {
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    if (player != null) {
      return player.getVolume();
    } else {
      return 50;
    }
  });
  const [slider, setSlider] = useState({ x: volume });

  useEffect(() => {
    if (
      player != null &&
      player.getVolume() > 0 &&
      player.getPlayerState() == 1
    ) {
      setIsPlaying(true);
      setVolume(slider.x);
      player.setVolume(volume);
    }
  }, [slider]);

  return (
    <>
      <div className="audioPlayer">
        <div className={"audioPlayer-content"}>
          <>
            {isPlaying ? (
              <>
                <div className="audioPlayer-content-controller">
                  <BsFillPauseFill
                    size={30}
                    color="white"
                    onClick={() => {
                      if (isPlaying) {
                        player.stopVideo();
                        setIsPlaying(false);
                      } else {
                        player.playVideo();
                        setIsPlaying(true);
                      }
                    }}
                  />
                  <Slider
                    axis="x"
                    x={slider.x}
                    onChange={({ x }) =>
                      setSlider((slider) => ({ ...slider, x }))
                    }
                    styles={{
                      track: {
                        backgroundColor: "rgba(255, 255, 255, 0.4)",
                        height: 5,
                        width: 100,
                        margin: 10,
                      },
                      active: {
                        backgroundColor: "white",
                      },
                      thumb: {
                        width: 15,
                        height: 15,
                        backgroundColor: "white",
                      },
                      disabled: {
                        opacity: 0.5,
                      },
                    }}
                  />
                </div>

                <div className="audioPlayer-content-infos">
                  <div className="playingIcon">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span> Vous écoutez : lofi hip hop radio</span>
                </div>
              </>
            ) : (
              <>
                <BsPlayFill
                  size={30}
                  color="white"
                  onClick={() => {
                    if (isPlaying) {
                      player.pauseVideo();
                      setIsPlaying(false);
                    } else {
                      player.playVideo();
                      player.setVolume(volume);
                      setIsPlaying(true);
                    }
                  }}
                />
                <div className="audioPlayer-content-infos">
                  <span> Un peu de musique pendant votre visite ?</span>
                </div>
              </>
            )}
          </>
        </div>
      </div>
    </>
  );
}
