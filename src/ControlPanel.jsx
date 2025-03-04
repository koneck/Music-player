import "./ControlPanel.css";
import FormatTime from "./FormatTime";
import { useState } from "react";
export default function ControlPanel({ data }) {
  const [launch, setLaunch] = useState(false);

  const { audioRef, currentTime, duration, handleChange } = data;

  function launchPauseSound() {
    if (!audioRef.current.paused && !launch) {
      audioRef.current.pause();
    } else {
      launch ? audioRef.current.pause() : audioRef.current.play();
      setLaunch(!launch);
    }
  }

  function handleChangeVolume(e) {
    let newVolume = e.target.value;
    audioRef.current.volume = newVolume;
  }

  return (
    <>
      {" "}
      <div id="control-panel">
        <button className="launchButton" onClick={launchPauseSound}>
          {launch && !audioRef.current.paused ? <span>&#9208;</span>: <span>&#9654;</span>}
          {/* неправильно показывает pause или play*/}
        </button>{" "}
        <FormatTime time={currentTime} />
        <input
          className="rewindMusic"
          type="range"
          min="0"
          max={duration}
          step="any"
          onChange={handleChange}
          value={currentTime}
        ></input>
        <div className="soundTime">
          <FormatTime time={duration} />
        </div>
        <input
          className="rewindVolume"
          type="range"
          min="0"
          max="1"
          step="any"
          onChange={handleChangeVolume}
        ></input>
      </div>
    </>
  );
}
