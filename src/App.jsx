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
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);


  function openFile(e) {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (file.type === "audio/mpeg") {
        let reader = new FileReader();
        reader.onload = () => {
          let newDataFile = { name: file.name, src: reader.result, durati: duration, };
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

  function handleOnloadedMetaData() {
    setDuration(audioRef.current.duration);
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
              // controls
              // src={data.src}
              ref={audioRef}
              onLoadedMetadata={handleOnloadedMetaData}
              onTimeUpdate={handleCurrentTime}
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
                    <span className="liFormatTime">"time"</span>
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
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
// исправить привязку времени только к последнему выброному треку, добавить объект с временем треков
//добавить логику включнеия следующего трека если он есть.
//добавить кнопки 1)повтора,2)случайной песни,3)стрелки перехода по трекам.
