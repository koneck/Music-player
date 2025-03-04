import "./NavigateBar.css";
export default function NavigateBar({ refUpload, openFile }) {
  return (
    <aside className="navigate-bar">
      <label>
        <div className="custom-input" onClick={() => refUpload.current.click()}>
          <p className="input-elem">загрузка музыки</p>
        </div>
      </label>
      <input
        onChange={openFile}
        type="file"
        className="file-upload"
        style={{ display: "none" }}
        ref={refUpload}
      ></input>
    </aside>
  );
}
