import "./ControlPanel.css";
import FormatTime from "./FormatTime";
import { useState } from "react";
export default function ControlPanel({ data }) {
  const [launch, setLaunch] = useState(false);
  const [loop, setLoop] = useState(true);
  const {
    audioRef,
    currentTime,
    duration,
    handleChange,
    selectIndexDataFiles,
  } = data;
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

  function onLoop() {
    setLoop(!loop);
    loop ? (audioRef.current.loop = true) : (audioRef.current.loop = false);
  }

  return (
    <>
      <div id="control-panel">
        <button className="launchButton" onClick={launchPauseSound}>
          {launch && !audioRef.current.paused ? (
            <span>&#9208;</span>
          ) : (
            <span>&#9654;</span>
          )}
          {/* неправильно показывает pause или play*/}
        </button>
        <button onClick={onLoop}>
          {loop ? <span>on loop</span> : <span>off loop</span>}
        </button>

        <input
          className="rewindMusic"
          type="range"
          min="0"
          max={duration[selectIndexDataFiles]}
          step="any"
          onChange={handleChange}
          value={currentTime}
        ></input>
        <div className="soundTime">
          <FormatTime time={currentTime} /> /
          <FormatTime time={duration[selectIndexDataFiles]} />
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
