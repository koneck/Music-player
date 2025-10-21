import "./App.css";
import NavigateBar from "./NavigateBar";
import NameMusic from "./NameMusic";
import ControlPanel from "./ControlPanel";
import { useRef, useState } from "react";
import FormatTime from "./FormatTime";

function App() {
  const refUpload = useRef(null);
  const audioRef = useRef(null);
  const [dataFiles, setDataFiles] = useState([]);
  const [selectIndexDataFiles, setSelectIndexDataFailes] = useState(null);
  const [duration, setDuration] = useState({});
  const [currentTime, setCurrentTime] = useState(0);

  function openFile(e) {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (file.type === "audio/mpeg") {
        let reader = new FileReader();
        reader.onload = () => {
          let newDataFile = {
            name: file.name,
            src: reader.result,
          };

          let tempAudio = new Audio();
          tempAudio.src = reader.result;
          tempAudio.onloadedmetadata = () => {
            setDuration((prevDuration) => ({
              ...prevDuration,
              [file.name]: tempAudio.duration,
            }));
          };

          return dataFiles.some((data) => data.name == newDataFile.name)
            ? 0
            : setDataFiles((prevDataFile) => [...prevDataFile, newDataFile]);
        };

        reader.readAsDataURL(file);
      } else {
        return;
      }
    });
  }

  function handleOnloadedMetaData(index) {
    setDuration((prevDuration) => ({
      ...prevDuration,
      [index]: audioRef.current.duration,
    }));
  }

  function handleCurrentTime() {
    setCurrentTime(audioRef.current.currentTime);
  }

  function handleChange(e) {
    let newTime = e.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  }

  function handleTrackClick(index) {
    setSelectIndexDataFailes(index);
    audioRef.current.src = dataFiles[index].src;
    audioRef.current.play();
  }

  function handleTrackEnd() {
    selectIndexDataFiles < dataFiles.length - 1
      ? handleTrackClick(selectIndexDataFiles + 1)
      : (audioRef.current.currentTime = 0);
  }
  return (
    <>
      <div id="main-container">
        <NavigateBar refUpload={refUpload} openFile={openFile} />

        <div id="player">
          <div className="name-music">
            <NameMusic songIndex={selectIndexDataFiles} songArr={dataFiles} />
          </div>

          <div className="songs-container">
            <audio
              ref={audioRef}
              onLoadedMetadata={() =>
                handleOnloadedMetaData(selectIndexDataFiles)
              }
              onTimeUpdate={handleCurrentTime}
              onEnded={handleTrackEnd}
            ></audio>
            <ul className="songs-list">
              {dataFiles &&
                dataFiles.map((data, index) => (
                  <li
                    key={data.name}
                    className="track"
                    onDoubleClick={() => handleTrackClick(index)}
                  >
                    {data.name.substring(0, data.name.indexOf("(www")).trim()}
                    <span className="liFormatTime">
                      <FormatTime time={duration[data.name]} />
                    </span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="control-container">
            <ControlPanel
              data={{
                audioRef,
                currentTime,
                duration,
                handleChange,
                selectIndexDataFiles,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
